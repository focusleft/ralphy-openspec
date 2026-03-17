"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStatusCommand = registerStatusCommand;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const cli_table3_1 = __importDefault(require("cli-table3"));
const persistence_1 = require("../core/memory/persistence");
const folders_1 = require("../core/folders");
const loader_1 = require("../core/spec/loader");
function registerStatusCommand(program) {
    program
        .command("status")
        .description("Show current/most recent run status")
        .option("--json", "Machine-readable output", false)
        .action(async (opts) => {
        const repoRoot = process.cwd();
        // Artifact-first: if STATUS.md exists, display it as primary source of truth.
        const candidateRoots = [];
        try {
            const spec = await new loader_1.SpecLoader(repoRoot).loadProjectSpec();
            if (spec.artifacts?.rootDir)
                candidateRoots.push(spec.artifacts.rootDir);
        }
        catch {
            // ignore spec load failures
        }
        candidateRoots.push(undefined); // default
        for (const rootDir of candidateRoots) {
            const statusPath = node_path_1.default.join((0, folders_1.getRalphyRoot)(repoRoot, rootDir), folders_1.FILES.status);
            try {
                const statusMd = await promises_1.default.readFile(statusPath, "utf8");
                if (opts.json) {
                    process.stdout.write(JSON.stringify({ ok: true, source: "artifact", statusPath, statusMarkdown: statusMd }, null, 2) + "\n");
                }
                else {
                    process.stdout.write(statusMd.trimEnd() + "\n");
                }
                return;
            }
            catch {
                // try next candidate
            }
        }
        const persistence = await persistence_1.PersistenceLayer.openForRepo(repoRoot);
        try {
            const run = persistence.getLatestRun();
            if (!run) {
                process.stdout.write(opts.json ? JSON.stringify({ ok: true, run: null }) + "\n" : "No runs found.\n");
                return;
            }
            const ledger = persistence.listLedger({ runId: run.runId, limit: 20 });
            if (opts.json) {
                process.stdout.write(JSON.stringify({
                    ok: true,
                    runSummary: run,
                    recentLedger: ledger,
                }, null, 2) + "\n");
                return;
            }
            const table = new cli_table3_1.default({ head: ["Field", "Value"] });
            table.push(["runId", run.runId], ["status", run.status], ["startedAt", run.startedAt]);
            process.stdout.write(table.toString() + "\n\n");
            process.stdout.write("Recent events:\n");
            for (const ev of ledger) {
                process.stdout.write(`- ${ev.ts} ${ev.kind}${ev.taskId ? ` [${ev.taskId}]` : ""}: ${ev.message}\n`);
            }
        }
        finally {
            persistence.close();
        }
    });
}
//# sourceMappingURL=status.js.map