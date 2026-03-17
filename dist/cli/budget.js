"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBudgetCommand = registerBudgetCommand;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const persistence_1 = require("../core/memory/persistence");
const folders_1 = require("../core/folders");
const spend_1 = require("../core/reporting/spend");
const loader_1 = require("../core/spec/loader");
function registerBudgetCommand(program) {
    program
        .command("budget")
        .description("Show budget/spend information for the latest run")
        .option("--json", "Machine-readable output", false)
        .action(async (opts) => {
        const repoRoot = process.cwd();
        const candidateRoots = [];
        try {
            const spec = await new loader_1.SpecLoader(repoRoot).loadProjectSpec();
            if (spec.artifacts?.rootDir)
                candidateRoots.push(spec.artifacts.rootDir);
        }
        catch {
            // ignore
        }
        candidateRoots.push(undefined);
        for (const rootDir of candidateRoots) {
            const budgetPath = node_path_1.default.join((0, folders_1.getRalphyRoot)(repoRoot, rootDir), folders_1.FILES.budget);
            try {
                const md = await promises_1.default.readFile(budgetPath, "utf8");
                if (!opts.json) {
                    process.stdout.write(md.trimEnd() + "\n");
                    return;
                }
                // If JSON requested, fall back to DB-derived structure below.
                break;
            }
            catch {
                // try next
            }
        }
        const persistence = await persistence_1.PersistenceLayer.openForRepo(repoRoot);
        try {
            const run = persistence.getLatestRun();
            if (!run) {
                process.stdout.write(opts.json ? JSON.stringify({ ok: true, run: null }) + "\n" : "No runs found.\n");
                return;
            }
            const ledger = persistence.listLedger({ runId: run.runId, limit: 2000 });
            const entries = (0, spend_1.extractSpendFromLedger)(ledger);
            const breakdown = (0, spend_1.aggregateSpend)(entries);
            if (opts.json) {
                process.stdout.write(JSON.stringify({
                    ok: true,
                    runId: run.runId,
                    spend: {
                        total: breakdown.total,
                        byTask: Object.fromEntries(breakdown.byTask),
                        byBackend: Object.fromEntries(breakdown.byBackend),
                        byPhase: Object.fromEntries(breakdown.byPhase),
                        entries: breakdown.entries,
                    },
                }, null, 2) + "\n");
            }
            else {
                process.stdout.write(`No ${folders_1.FILES.budget} artifact found.\nRun again with artifacts enabled to generate it.\n`);
            }
        }
        finally {
            persistence.close();
        }
    });
}
//# sourceMappingURL=budget.js.map