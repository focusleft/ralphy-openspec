"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = __importDefault(require("node:path"));
const loop_1 = require("./loop");
const noop_1 = require("../backends/noop");
class ScopeWorkspace {
    cwd;
    mode = "patch";
    constructor(cwd) {
        this.cwd = cwd;
    }
    async prepare(taskId) {
        return { taskId, workingDir: this.cwd };
    }
    getWorkingDir() {
        return this.cwd;
    }
    async getChangedFiles() {
        // Pretend the backend changed an unrelated file.
        return [{ file: "unrelated.txt", isNew: true }];
    }
    async enforceContract() {
        return [];
    }
    async checkpoint() {
        return { ref: "noop" };
    }
    async merge() { }
    async revert() { }
    async cleanup() { }
}
(0, vitest_1.describe)("scope guard policy", () => {
    (0, vitest_1.it)("does not block when scopeGuard=warn", async () => {
        const tmp = await promises_1.default.mkdtemp(node_path_1.default.join(node_os_1.default.tmpdir(), "ralphy-scope-"));
        const spec = {
            version: "1.1",
            project: { name: "tmp", repoRoot: "." },
            defaults: { backend: "noop", workspaceMode: "patch", checkpointMode: "commit", validators: [] },
            policies: { scopeGuard: "warn" },
            budgets: { limits: { commandTimeoutSeconds: 5 } },
            validators: [],
            tasks: [{ id: "t1", sprint: { size: "XS", intent: "fix" } }],
            artifacts: { enabled: false },
        };
        const outcome = await new loop_1.EngineLoop().run({
            repoRoot: tmp,
            spec,
            backend: new noop_1.NoopBackend("noop"),
            workspace: new ScopeWorkspace(tmp),
            dryRun: false,
            json: true,
        });
        // With warn, the scope violation is a warning and should not fail the run by itself.
        (0, vitest_1.expect)(outcome.ok).toBe(true);
    });
    (0, vitest_1.it)("blocks when scopeGuard=block", async () => {
        const tmp = await promises_1.default.mkdtemp(node_path_1.default.join(node_os_1.default.tmpdir(), "ralphy-scope-"));
        const spec = {
            version: "1.1",
            project: { name: "tmp", repoRoot: "." },
            defaults: { backend: "noop", workspaceMode: "patch", checkpointMode: "commit", validators: [] },
            policies: { scopeGuard: "block" },
            budgets: { limits: { commandTimeoutSeconds: 5 } },
            validators: [],
            tasks: [{ id: "t1", sprint: { size: "XS", intent: "fix" } }],
            artifacts: { enabled: false },
        };
        const outcome = await new loop_1.EngineLoop().run({
            repoRoot: tmp,
            spec,
            backend: new noop_1.NoopBackend("noop"),
            workspace: new ScopeWorkspace(tmp),
            dryRun: false,
            json: true,
        });
        (0, vitest_1.expect)(outcome.ok).toBe(false);
    });
});
//# sourceMappingURL=constraints.policy.test.js.map