"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchModeWorkspace = void 0;
exports.getPatchWorkspaceRoot = getPatchWorkspaceRoot;
const execa_1 = require("execa");
const node_path_1 = __importDefault(require("node:path"));
const file_contract_1 = require("../spec/file-contract");
class PatchModeWorkspace {
    repoRoot;
    mode = "patch";
    stateByTask = new Map();
    constructor(repoRoot) {
        this.repoRoot = repoRoot;
    }
    async prepare(taskId) {
        const snapshotCommit = await this.git(["rev-parse", "HEAD"]);
        this.stateByTask.set(taskId, { snapshotCommit });
        return { taskId, workingDir: this.repoRoot };
    }
    getWorkingDir(_taskId) {
        return this.repoRoot;
    }
    async getChangedFiles(_taskId) {
        // name-status gives: A/M/D/R... <path> ...
        const out = await this.git(["diff", "--name-status"]);
        const lines = out
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);
        const changed = [];
        for (const line of lines) {
            const parts = line.split(/\s+/);
            const status = parts[0] ?? "";
            const file = parts[1] ?? "";
            if (!file)
                continue;
            changed.push({ file, isNew: status.startsWith("A") });
        }
        return changed;
    }
    async enforceContract(taskId, contract) {
        const changedFiles = await this.getChangedFiles(taskId);
        const violations = (0, file_contract_1.evaluateFileContract)({ changedFiles, contract });
        if (violations.length) {
            await this.revert(taskId);
        }
        return violations;
    }
    async checkpoint(taskId, message) {
        // Best effort: commit all changes. If nothing to commit, return HEAD.
        await this.git(["add", "-A"]);
        const commitMsg = `[ralphy-spec] ${taskId}: ${message}`;
        try {
            await this.git(["commit", "-m", commitMsg]);
        }
        catch {
            // likely "nothing to commit"
        }
        const ref = await this.git(["rev-parse", "HEAD"]);
        return { ref };
    }
    async merge(_taskId) {
        // Patch mode executes on main; merge is no-op.
    }
    async revert(taskId) {
        const state = this.stateByTask.get(taskId);
        if (!state)
            return;
        // Hard revert to snapshot; also remove untracked files.
        await this.git(["reset", "--hard", state.snapshotCommit]);
        await this.git(["clean", "-fd"]);
    }
    async cleanup(_taskId) {
        // No-op for patch mode.
    }
    async git(args) {
        const res = await (0, execa_1.execa)("git", args, {
            cwd: this.repoRoot,
            stdio: "pipe",
        });
        return res.stdout.trim();
    }
}
exports.PatchModeWorkspace = PatchModeWorkspace;
function getPatchWorkspaceRoot(repoRoot) {
    return node_path_1.default.resolve(repoRoot);
}
//# sourceMappingURL=patch-mode.js.map