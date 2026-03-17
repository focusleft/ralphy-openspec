"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorktreeModeWorkspace = void 0;
const execa_1 = require("execa");
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = __importDefault(require("node:fs/promises"));
const folders_1 = require("../folders");
const file_contract_1 = require("../spec/file-contract");
/**
 * WorktreeModeWorkspace uses git worktrees for task isolation.
 *
 * Each task runs in its own worktree branch, providing complete isolation
 * from the main working directory. Changes are merged back on success.
 */
class WorktreeModeWorkspace {
    repoRoot;
    mode = "worktree";
    stateByTask = new Map();
    worktreeBase;
    constructor(repoRoot) {
        this.repoRoot = repoRoot;
        this.worktreeBase = node_path_1.default.join((0, folders_1.getRalphyRoot)(repoRoot), folders_1.FOLDERS.worktrees);
    }
    async prepare(taskId) {
        // Ensure worktree base directory exists
        await promises_1.default.mkdir(this.worktreeBase, { recursive: true });
        // Get current HEAD as base
        const baseCommit = await this.git(["rev-parse", "HEAD"], this.repoRoot);
        // Create a unique branch name for this task
        const branchName = `ralphy/${taskId}/${Date.now()}`;
        const worktreePath = node_path_1.default.join(this.worktreeBase, taskId.replace(/[^a-zA-Z0-9-_]/g, "_"));
        // Clean up existing worktree if present
        try {
            await promises_1.default.rm(worktreePath, { recursive: true, force: true });
        }
        catch {
            // Ignore if doesn't exist
        }
        // Remove stale worktree entry if any
        try {
            await this.git(["worktree", "remove", "--force", worktreePath], this.repoRoot);
        }
        catch {
            // Ignore if doesn't exist
        }
        // Create new worktree with a new branch
        await this.git(["worktree", "add", "-b", branchName, worktreePath, baseCommit], this.repoRoot);
        this.stateByTask.set(taskId, { worktreePath, branchName, baseCommit });
        return { taskId, workingDir: worktreePath };
    }
    getWorkingDir(taskId) {
        const state = this.stateByTask.get(taskId);
        return state?.worktreePath ?? this.repoRoot;
    }
    async getChangedFiles(taskId) {
        const state = this.stateByTask.get(taskId);
        if (!state)
            return [];
        // Get changes compared to base commit
        const out = await this.git(["diff", "--name-status", state.baseCommit], state.worktreePath);
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
            // Revert the worktree to base state
            await this.revert(taskId);
        }
        return violations;
    }
    async checkpoint(taskId, message) {
        const state = this.stateByTask.get(taskId);
        if (!state) {
            throw new Error(`No worktree state for task ${taskId}`);
        }
        // Stage and commit all changes in worktree
        await this.git(["add", "-A"], state.worktreePath);
        const commitMsg = `[ralphy-spec] ${taskId}: ${message}`;
        try {
            await this.git(["commit", "-m", commitMsg], state.worktreePath);
        }
        catch {
            // Likely nothing to commit
        }
        const ref = await this.git(["rev-parse", "HEAD"], state.worktreePath);
        return { ref };
    }
    async merge(taskId) {
        const state = this.stateByTask.get(taskId);
        if (!state)
            return;
        // Get the current branch in main repo
        const currentBranch = await this.git(["rev-parse", "--abbrev-ref", "HEAD"], this.repoRoot);
        // Merge the task branch back using --squash for clean history
        try {
            await this.git(["merge", "--squash", state.branchName], this.repoRoot);
            await this.git(["commit", "-m", `[ralphy-spec] Merge task ${taskId}`], this.repoRoot);
        }
        catch (err) {
            // If merge fails, user may need to resolve manually
            throw new Error(`Failed to merge task ${taskId}: ${err?.message ?? String(err)}. Manual resolution may be required.`);
        }
    }
    async revert(taskId) {
        const state = this.stateByTask.get(taskId);
        if (!state)
            return;
        // Hard reset worktree to base commit
        await this.git(["reset", "--hard", state.baseCommit], state.worktreePath);
        await this.git(["clean", "-fd"], state.worktreePath);
    }
    async cleanup(taskId) {
        const state = this.stateByTask.get(taskId);
        if (!state)
            return;
        try {
            // Remove the worktree
            await this.git(["worktree", "remove", "--force", state.worktreePath], this.repoRoot);
            // Delete the branch
            await this.git(["branch", "-D", state.branchName], this.repoRoot);
        }
        catch {
            // Best effort cleanup
        }
        this.stateByTask.delete(taskId);
    }
    async git(args, cwd) {
        const res = await (0, execa_1.execa)("git", args, {
            cwd,
            stdio: "pipe",
            reject: false,
        });
        if (res.exitCode !== 0 && res.stderr) {
            throw new Error(`git ${args.join(" ")} failed: ${res.stderr}`);
        }
        return res.stdout.trim();
    }
}
exports.WorktreeModeWorkspace = WorktreeModeWorkspace;
//# sourceMappingURL=worktree-mode.js.map