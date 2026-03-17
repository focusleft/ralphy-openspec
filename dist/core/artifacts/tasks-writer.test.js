"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = __importDefault(require("node:path"));
const tasks_writer_1 = require("./tasks-writer");
const folders_1 = require("../folders");
(0, vitest_1.describe)("writeTasksBoard", () => {
    (0, vitest_1.it)("writes TASKS.md with configurable icon mode", async () => {
        const repoRoot = await promises_1.default.mkdtemp(node_path_1.default.join(node_os_1.default.tmpdir(), "ralphy-artifacts-"));
        await (0, tasks_writer_1.writeTasksBoard)({
            repoRoot,
            runId: "run_1",
            statusIcons: "ascii",
            specTasks: [{ id: "t1", title: "Hello" }],
            rows: [{ taskId: "t1", status: "running", iteration: 2 }],
        });
        const tasksPath = node_path_1.default.join((0, folders_1.getRalphyRoot)(repoRoot), folders_1.FILES.tasks);
        const md = await promises_1.default.readFile(tasksPath, "utf8");
        (0, vitest_1.expect)(md).toContain("# TASKS");
        (0, vitest_1.expect)(md).toContain("[~] running");
    });
});
//# sourceMappingURL=tasks-writer.test.js.map