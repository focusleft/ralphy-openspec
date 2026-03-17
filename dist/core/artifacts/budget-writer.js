"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBudgetReport = writeBudgetReport;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const folders_1 = require("../folders");
const spend_1 = require("../reporting/spend");
async function writeBudgetReport(args) {
    const root = await (0, folders_1.ensureRalphyFolders)(args.repoRoot, args.rootDir);
    const filePath = node_path_1.default.join(root, folders_1.FILES.budget);
    const breakdown = (0, spend_1.aggregateSpend)((0, spend_1.extractSpendFromLedger)(args.ledgerEvents));
    const md = [
        `# BUDGET`,
        ``,
        `- **runId**: \`${args.runId}\``,
        `- **updatedAt**: ${new Date().toISOString()}`,
        ``,
        (0, spend_1.formatSpendReport)(breakdown),
        ``,
        `> Note: spend is best-effort and depends on backend emitting usage. Today, wallTime/iterations are tracked; USD/tokens may be 0 for some backends.`,
        ``,
    ].join("\n");
    await promises_1.default.writeFile(filePath, md, "utf8");
}
//# sourceMappingURL=budget-writer.js.map