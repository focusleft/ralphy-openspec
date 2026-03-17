"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeStatus = writeStatus;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const folders_1 = require("../folders");
async function writeStatus(input) {
    const root = await (0, folders_1.ensureRalphyFolders)(input.repoRoot, input.rootDir);
    const filePath = node_path_1.default.join(root, folders_1.FILES.status);
    const lines = [];
    lines.push(`# STATUS`);
    lines.push(``);
    lines.push(`- **runId**: \`${input.runId}\``);
    if (input.backendId)
        lines.push(`- **backend**: ${input.backendId}`);
    if (input.workspaceMode)
        lines.push(`- **workspace**: ${input.workspaceMode}`);
    if (input.taskId)
        lines.push(`- **taskId**: \`${input.taskId}\``);
    lines.push(`- **phase**: ${input.phase}`);
    if (typeof input.iteration === "number")
        lines.push(`- **iteration**: ${input.iteration}`);
    if (input.tier)
        lines.push(`- **tier**: ${input.tier}`);
    lines.push(`- **updatedAt**: ${new Date().toISOString()}`);
    lines.push(``);
    if (input.message) {
        lines.push(`## Message`);
        lines.push(``);
        lines.push(input.message);
        lines.push(``);
    }
    if (input.budgetStatus) {
        const s = input.budgetStatus;
        lines.push(`## Budget`);
        lines.push(``);
        lines.push(`- used: $${s.usedUsd.toFixed(4)}, ${s.usedTokens.toLocaleString()} tokens, ${s.usedIterations} iterations`);
        lines.push(`- tier: ${s.tier}${s.isAtHardCap ? " (HARD CAP)" : ""}`);
        lines.push(``);
    }
    lines.push(`## Files`);
    lines.push(``);
    lines.push(`- root: \`${(0, folders_1.getRalphyRoot)(input.repoRoot, input.rootDir)}\``);
    lines.push(`- runs: \`runs/<runId>.md\` (immutable on completion)`);
    lines.push(`- tasks: \`tasks/<taskId>/\` (CONTEXT.md / REPAIR.md / NOTES.md)`);
    lines.push(``);
    await promises_1.default.writeFile(filePath, lines.join("\n"), "utf8");
}
//# sourceMappingURL=status-writer.js.map