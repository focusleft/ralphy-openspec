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
class MemoryWorkspace {
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
        return [];
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
(0, vitest_1.describe)("EngineLoop hard cap blocking", () => {
    (0, vitest_1.it)("blocks a task at hard cap without silent retries", async () => {
        const tmp = await promises_1.default.mkdtemp(node_path_1.default.join(node_os_1.default.tmpdir(), "ralphy-loop-"));
        await promises_1.default.mkdir(node_path_1.default.join(tmp, "openspec"), { recursive: true });
        // Minimal openspec/project.yml is not required because we pass spec directly,
        // but the persistence layer expects a repoRoot folder to exist.
        const spec = {
            version: "1.1",
            project: { name: "tmp", repoRoot: "." },
            defaults: { backend: "noop", workspaceMode: "patch", checkpointMode: "commit", validators: [] },
            budgets: { limits: { commandTimeoutSeconds: 5 } },
            validators: [
                { id: "failfast", run: 'node -e "process.exit(1)"', timeoutSeconds: 5, parser: "jest" },
            ],
            tasks: [
                {
                    id: "t1",
                    title: "Hard cap test",
                    validators: ["failfast"],
                    budget: { hard: { maxIterations: 1 } },
                },
            ],
            artifacts: { enabled: false },
        };
        const engine = new loop_1.EngineLoop();
        const outcome = await engine.run({
            repoRoot: tmp,
            spec,
            backend: new noop_1.NoopBackend("noop"),
            workspace: new MemoryWorkspace(tmp),
            dryRun: false,
            json: true,
        });
        (0, vitest_1.expect)(outcome.ok).toBe(false);
        if (!outcome.ok) {
            (0, vitest_1.expect)(outcome.exitCode).toBe(2);
            (0, vitest_1.expect)(outcome.reason).toContain("Hard cap");
        }
    });
});
//# sourceMappingURL=loop.hardcap.test.js.map