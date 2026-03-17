"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFailureSummary = buildFailureSummary;
const spend_1 = require("./spend");
function buildFailureSummary(input) {
    const lines = [];
    lines.push(`# Task blocked`);
    lines.push(``);
    lines.push(`- **runId**: \`${input.runId}\``);
    lines.push(`- **taskId**: \`${input.taskId}\``);
    lines.push(`- **reason**: ${input.reason}`);
    if (input.tier)
        lines.push(`- **tier**: ${input.tier}`);
    lines.push(``);
    if (input.budgetStatus) {
        const s = input.budgetStatus;
        lines.push(`## Budget status`);
        lines.push(``);
        lines.push(`- **tier**: ${s.tier}`);
        lines.push(`- **used**: $${s.usedUsd.toFixed(4)}, ${s.usedTokens.toLocaleString()} tokens, ${s.usedIterations} iterations`);
        lines.push(`- **hard cap**: ${s.isAtHardCap ? "YES" : "no"}`);
        lines.push(``);
    }
    if (input.lastIssues && input.lastIssues.length) {
        lines.push(`## Last issues`);
        lines.push(``);
        for (const issue of input.lastIssues.slice(0, 50)) {
            const meta = [];
            if (issue.level)
                meta.push(issue.level);
            if (issue.kind)
                meta.push(issue.kind);
            if (issue.file)
                meta.push(issue.file);
            const prefix = meta.length ? `[${meta.join(" / ")}] ` : "";
            lines.push(`- ${prefix}${issue.message}`);
        }
        lines.push(``);
    }
    if (input.ledgerEvents && input.ledgerEvents.length) {
        const entries = (0, spend_1.extractSpendFromLedger)(input.ledgerEvents);
        if (entries.length) {
            lines.push(`## Spend breakdown`);
            lines.push(``);
            lines.push((0, spend_1.formatSpendReport)((0, spend_1.aggregateSpend)(entries)));
            lines.push(``);
        }
    }
    lines.push(`## Suggested manual steps`);
    lines.push(``);
    const steps = input.suggestedSteps?.length
        ? input.suggestedSteps
        : [
            "Inspect recent validator output and fix the first failing error.",
            "Re-run validators locally until green.",
            "If this is a scope issue, narrow the task or adjust the file contract/sprint settings.",
        ];
    for (const step of steps)
        lines.push(`- ${step}`);
    lines.push(``);
    return lines.join("\n");
}
//# sourceMappingURL=failure-summary.js.map