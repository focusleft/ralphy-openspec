"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = __importDefault(require("node:path"));
const run_log_writer_1 = require("./run-log-writer");
const folders_1 = require("../folders");
(0, vitest_1.describe)("writeRunLogOnce", () => {
    (0, vitest_1.it)("creates the run log once and does not overwrite", async () => {
        const repoRoot = await promises_1.default.mkdtemp(node_path_1.default.join(node_os_1.default.tmpdir(), "ralphy-runlog-"));
        const runId = "run_test";
        const first = await (0, run_log_writer_1.writeRunLogOnce)({
            repoRoot,
            runId,
            outcome: { ok: true },
            ledgerEvents: [{ ts: "t", kind: "run_started", message: "Run started" }],
        });
        const second = await (0, run_log_writer_1.writeRunLogOnce)({
            repoRoot,
            runId,
            outcome: { ok: false, exitCode: 4, reason: "nope" },
            ledgerEvents: [{ ts: "t2", kind: "run_error", message: "error" }],
        });
        (0, vitest_1.expect)(first.created).toBe(true);
        (0, vitest_1.expect)(second.created).toBe(false);
        const p = node_path_1.default.join((0, folders_1.getRalphyRoot)(repoRoot), folders_1.FOLDERS.runs, `${runId}.md`);
        const md = await promises_1.default.readFile(p, "utf8");
        (0, vitest_1.expect)(md).toContain("# Run log");
        (0, vitest_1.expect)(md).toContain("run_started");
        (0, vitest_1.expect)(md).not.toContain("run_error");
    });
});
//# sourceMappingURL=run-log-writer.test.js.map