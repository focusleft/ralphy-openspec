"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeRunLogOnce = writeRunLogOnce;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const folders_1 = require("../folders");
async function writeRunLogOnce(args) {
    const root = await (0, folders_1.ensureRalphyFolders)(args.repoRoot, args.rootDir);
    const filePath = node_path_1.default.join(root, folders_1.FOLDERS.runs, `${args.runId}.md`);
    const lines = [];
    lines.push(`# Run log`);
    lines.push(``);
    lines.push(`- **runId**: \`${args.runId}\``);
    lines.push(`- **status**: ${args.outcome.ok ? "success" : "stopped"}`);
    if (!args.outcome.ok) {
        lines.push(`- **exitCode**: ${args.outcome.exitCode ?? "?"}`);
        lines.push(`- **reason**: ${args.outcome.reason ?? "unknown"}`);
    }
    lines.push(`- **createdAt**: ${new Date().toISOString()}`);
    lines.push(``);
    lines.push(`## Ledger (chronological)`);
    lines.push(``);
    for (const ev of args.ledgerEvents) {
        lines.push(`- ${ev.ts} ${ev.kind}${ev.taskId ? ` [${ev.taskId}]` : ""}: ${ev.message}`);
    }
    lines.push(``);
    try {
        await promises_1.default.writeFile(filePath, lines.join("\n"), { encoding: "utf8", flag: "wx" });
        return { path: filePath, created: true };
    }
    catch (e) {
        if (e?.code === "EEXIST")
            return { path: filePath, created: false };
        throw e;
    }
}
//# sourceMappingURL=run-log-writer.js.map