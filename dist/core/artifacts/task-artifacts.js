"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTaskContext = writeTaskContext;
exports.writeTaskRepair = writeTaskRepair;
exports.appendTaskNotes = appendTaskNotes;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const folders_1 = require("../folders");
function safeTaskDirName(taskId) {
    return taskId.replace(/[^a-zA-Z0-9-_]/g, "_");
}
async function ensureTaskDir(repoRoot, rootDir, taskId) {
    const root = await (0, folders_1.ensureRalphyFolders)(repoRoot, rootDir);
    const dir = node_path_1.default.join(root, folders_1.FOLDERS.tasks, safeTaskDirName(taskId));
    await promises_1.default.mkdir(dir, { recursive: true });
    return dir;
}
async function writeTaskContext(args) {
    const dir = await ensureTaskDir(args.repoRoot, args.rootDir, args.taskId);
    await promises_1.default.writeFile(node_path_1.default.join(dir, "CONTEXT.md"), args.markdown, "utf8");
}
async function writeTaskRepair(args) {
    const dir = await ensureTaskDir(args.repoRoot, args.rootDir, args.taskId);
    await promises_1.default.writeFile(node_path_1.default.join(dir, "REPAIR.md"), args.markdown, "utf8");
}
async function appendTaskNotes(args) {
    const dir = await ensureTaskDir(args.repoRoot, args.rootDir, args.taskId);
    const p = node_path_1.default.join(dir, "NOTES.md");
    const line = `- ${new Date().toISOString()} ${args.note}\n`;
    await promises_1.default.appendFile(p, line, "utf8").catch(async () => promises_1.default.writeFile(p, line, "utf8"));
}
//# sourceMappingURL=task-artifacts.js.map