"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerReportCommand = registerReportCommand;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const persistence_1 = require("../core/memory/persistence");
function registerReportCommand(program) {
    program
        .command("report")
        .description("Generate a markdown report for the latest run")
        .option("--out <filepath>", "Output markdown file", "ralphy-report.md")
        .option("--json", "Machine-readable output", false)
        .action(async (opts) => {
        const repoRoot = process.cwd();
        const persistence = await persistence_1.PersistenceLayer.openForRepo(repoRoot);
        try {
            const run = persistence.getLatestRun();
            if (!run) {
                process.stderr.write("No runs found.\n");
                process.exitCode = 1;
                return;
            }
            const ledger = persistence.listLedger({ runId: run.runId, limit: 500 });
            const md = [
                `# Ralphy Spec Report`,
                ``,
                `- Run ID: \`${run.runId}\``,
                `- Status: \`${run.status}\``,
                `- Started: \`${run.startedAt}\``,
                ``,
                `## Recent ledger`,
                ``,
                ...ledger.map((e) => `- ${e.ts} \`${e.kind}\`${e.taskId ? ` (\`${e.taskId}\`)` : ""}: ${e.message}`),
                ``,
            ].join("\n");
            const outPath = node_path_1.default.resolve(repoRoot, opts.out);
            await promises_1.default.writeFile(outPath, md, "utf8");
            if (opts.json) {
                process.stdout.write(JSON.stringify({ ok: true, runId: run.runId, out: outPath }, null, 2) + "\n");
            }
            else {
                process.stdout.write(`Wrote ${outPath}\n`);
            }
        }
        finally {
            persistence.close();
        }
    });
}
//# sourceMappingURL=report.js.map