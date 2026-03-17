"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = __importDefault(require("node:path"));
const status_writer_1 = require("./status-writer");
const folders_1 = require("../folders");
(0, vitest_1.describe)("writeStatus", () => {
    (0, vitest_1.it)("includes backend/workspace and budget when provided", async () => {
        const repoRoot = await promises_1.default.mkdtemp(node_path_1.default.join(node_os_1.default.tmpdir(), "ralphy-status-"));
        await (0, status_writer_1.writeStatus)({
            repoRoot,
            runId: "run_1",
            backendId: "noop",
            workspaceMode: "patch",
            phase: "EXEC",
            taskId: "t1",
            iteration: 2,
            tier: "warning",
            budgetStatus: {
                tier: "warning",
                usedUsd: 1.23,
                usedTokens: 100,
                usedTimeMs: 1000,
                usedIterations: 2,
                usdPctOfOptimal: null,
                usdPctOfHard: null,
                tokensPctOfOptimal: null,
                tokensPctOfHard: null,
                timePctOfOptimal: null,
                timePctOfHard: null,
                isInWarning: true,
                isAtHardCap: false,
            },
        });
        const p = node_path_1.default.join((0, folders_1.getRalphyRoot)(repoRoot), folders_1.FILES.status);
        const md = await promises_1.default.readFile(p, "utf8");
        (0, vitest_1.expect)(md).toContain("**backend**");
        (0, vitest_1.expect)(md).toContain("**workspace**");
        (0, vitest_1.expect)(md).toContain("## Budget");
    });
});
//# sourceMappingURL=status-writer.test.js.map