"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBackendLog = writeBackendLog;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
async function writeBackendLog(args) {
    const dir = node_path_1.default.dirname(args.logFile);
    await promises_1.default.mkdir(dir, { recursive: true });
    const max = 200_000; // keep artifacts bounded
    const trim = (s) => (s.length > max ? s.slice(0, max) + "\n\n[...truncated...]\n" : s);
    const durationMs = new Date(args.finishedAt).getTime() - new Date(args.startedAt).getTime();
    const durationSec = Math.floor(durationMs / 1000);
    const out = [
        `# Backend log`,
        ``,
        `- startedAt: ${args.startedAt}`,
        `- finishedAt: ${args.finishedAt}`,
        `- duration: ${durationSec}s (${Math.floor(durationMs)}ms)`,
        `- backend: ${args.backendId}`,
        `- cwd: ${args.cwd}`,
        `- command: ${args.command}`,
        `- argv: ${JSON.stringify(args.argv)}`,
        `- exitCode: ${args.exitCode ?? "null"}`,
        ...(args.timedOut !== undefined ? [`- timedOut: ${args.timedOut}`] : []),
        ...(args.timeoutMs !== undefined
            ? [`- timeoutMs: ${args.timeoutMs} (${Math.floor(args.timeoutMs / 60_000)} minutes)`]
            : []),
        ``,
        `## stdout`,
        ``,
        args.stdout ? "```" : "(empty)",
        ...(args.stdout ? [trim(args.stdout), "```"] : []),
        ``,
        `## stderr`,
        ``,
        args.stderr ? "```" : "(empty)",
        ...(args.stderr ? [trim(args.stderr), "```"] : []),
        ``,
    ].join("\n");
    await promises_1.default.writeFile(args.logFile, out, "utf8");
}
//# sourceMappingURL=log-writer.js.map