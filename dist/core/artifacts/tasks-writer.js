"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTasksBoard = writeTasksBoard;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const folders_1 = require("../folders");
const STATUS_ICON_EMOJI = {
    pending: "⬜",
    running: "⏳",
    done: "✅",
    blocked: "⛔",
    error: "❌",
};
const STATUS_ICON_ASCII = {
    pending: "[ ]",
    running: "[~]",
    done: "[x]",
    blocked: "[!]",
    error: "[x!]",
};
async function writeTasksBoard(args) {
    const root = await (0, folders_1.ensureRalphyFolders)(args.repoRoot, args.rootDir);
    const filePath = node_path_1.default.join(root, folders_1.FILES.tasks);
    const titleById = new Map(args.specTasks.map((t) => [t.id, t.title]));
    const goalById = new Map(args.specTasks.map((t) => [t.id, t.goal]));
    const lines = [];
    lines.push(`# TASKS`);
    lines.push(``);
    lines.push(`- **runId**: \`${args.runId}\``);
    lines.push(`- **updatedAt**: ${new Date().toISOString()}`);
    lines.push(``);
    lines.push(`| Task | Status | Phase | Iter | Title |`);
    lines.push(`|------|--------|-------|------|-------|`);
    for (const r of args.rows) {
        const mode = args.statusIcons ?? "emoji";
        const icon = mode === "none"
            ? ""
            : (mode === "ascii" ? STATUS_ICON_ASCII : STATUS_ICON_EMOJI)[r.status] ?? "";
        const title = titleById.get(r.taskId) ?? "";
        const statusCell = `${icon ? `${icon} ` : ""}${r.status}`;
        lines.push(`| \`${r.taskId}\` | ${statusCell} | ${r.phase ?? ""} | ${r.iteration} | ${escapePipes(title)} |`);
    }
    lines.push(``);
    // Optional details for blocked/error tasks.
    const trouble = args.rows.filter((r) => r.status === "blocked" || r.status === "error");
    if (trouble.length) {
        lines.push(`## Attention`);
        lines.push(``);
        for (const r of trouble) {
            lines.push(`### ${r.taskId}`);
            const goal = goalById.get(r.taskId);
            if (goal)
                lines.push(goal.trim());
            if (r.lastError)
                lines.push(`\nLast error: ${r.lastError}`);
            lines.push(``);
        }
    }
    await promises_1.default.writeFile(filePath, lines.join("\n"), "utf8");
}
function escapePipes(s) {
    return s.replace(/\|/g, "\\|");
}
//# sourceMappingURL=tasks-writer.js.map