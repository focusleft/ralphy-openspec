"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateSpend = aggregateSpend;
exports.formatSpendReport = formatSpendReport;
exports.extractSpendFromLedger = extractSpendFromLedger;
/**
 * Aggregate spend data from ledger events.
 *
 * This processes ledger events to build a breakdown of spending
 * by task, backend, and phase.
 */
function aggregateSpend(events) {
    const total = { usd: 0, tokens: 0, wallTimeMs: 0, iterations: 0 };
    const byTask = new Map();
    const byBackend = new Map();
    const byPhase = new Map();
    for (const entry of events) {
        // Accumulate total
        total.usd += entry.usd;
        total.tokens += entry.tokens;
        total.wallTimeMs += entry.wallTimeMs;
        total.iterations += entry.iterations;
        // By task
        const taskUsage = byTask.get(entry.taskId) ?? {
            usd: 0,
            tokens: 0,
            wallTimeMs: 0,
            iterations: 0,
        };
        taskUsage.usd += entry.usd;
        taskUsage.tokens += entry.tokens;
        taskUsage.wallTimeMs += entry.wallTimeMs;
        taskUsage.iterations += entry.iterations;
        byTask.set(entry.taskId, taskUsage);
        // By backend (if present)
        if (entry.backendId) {
            const backendUsage = byBackend.get(entry.backendId) ?? {
                usd: 0,
                tokens: 0,
                wallTimeMs: 0,
                iterations: 0,
            };
            backendUsage.usd += entry.usd;
            backendUsage.tokens += entry.tokens;
            backendUsage.wallTimeMs += entry.wallTimeMs;
            backendUsage.iterations += entry.iterations;
            byBackend.set(entry.backendId, backendUsage);
        }
        // By phase (if present)
        if (entry.phase) {
            const phaseUsage = byPhase.get(entry.phase) ?? {
                usd: 0,
                tokens: 0,
                wallTimeMs: 0,
                iterations: 0,
            };
            phaseUsage.usd += entry.usd;
            phaseUsage.tokens += entry.tokens;
            phaseUsage.wallTimeMs += entry.wallTimeMs;
            phaseUsage.iterations += entry.iterations;
            byPhase.set(entry.phase, phaseUsage);
        }
    }
    return { total, byTask, byBackend, byPhase, entries: events };
}
/**
 * Format spend breakdown as markdown report.
 */
function formatSpendReport(breakdown) {
    const lines = [];
    lines.push(`# Spend Breakdown Report`);
    lines.push(``);
    // Total
    lines.push(`## Summary`);
    lines.push(``);
    lines.push(`| Metric | Value |`);
    lines.push(`|--------|-------|`);
    lines.push(`| Total USD | $${breakdown.total.usd.toFixed(4)} |`);
    lines.push(`| Total Tokens | ${breakdown.total.tokens.toLocaleString()} |`);
    lines.push(`| Wall Time | ${formatDuration(breakdown.total.wallTimeMs)} |`);
    lines.push(`| Iterations | ${breakdown.total.iterations} |`);
    lines.push(``);
    // By Task
    if (breakdown.byTask.size > 0) {
        lines.push(`## By Task`);
        lines.push(``);
        lines.push(`| Task | USD | Tokens | Time | Iterations |`);
        lines.push(`|------|-----|--------|------|------------|`);
        for (const [taskId, usage] of breakdown.byTask.entries()) {
            lines.push(`| ${taskId} | $${usage.usd.toFixed(4)} | ${usage.tokens.toLocaleString()} | ${formatDuration(usage.wallTimeMs)} | ${usage.iterations} |`);
        }
        lines.push(``);
    }
    // By Backend
    if (breakdown.byBackend.size > 0) {
        lines.push(`## By Backend`);
        lines.push(``);
        lines.push(`| Backend | USD | Tokens | Time | Iterations |`);
        lines.push(`|---------|-----|--------|------|------------|`);
        for (const [backendId, usage] of breakdown.byBackend.entries()) {
            lines.push(`| ${backendId} | $${usage.usd.toFixed(4)} | ${usage.tokens.toLocaleString()} | ${formatDuration(usage.wallTimeMs)} | ${usage.iterations} |`);
        }
        lines.push(``);
    }
    // By Phase
    if (breakdown.byPhase.size > 0) {
        lines.push(`## By Phase`);
        lines.push(``);
        lines.push(`| Phase | USD | Tokens | Time | Iterations |`);
        lines.push(`|-------|-----|--------|------|------------|`);
        for (const [phase, usage] of breakdown.byPhase.entries()) {
            lines.push(`| ${phase} | $${usage.usd.toFixed(4)} | ${usage.tokens.toLocaleString()} | ${formatDuration(usage.wallTimeMs)} | ${usage.iterations} |`);
        }
        lines.push(``);
    }
    return lines.join("\n");
}
/**
 * Format duration in human-readable form.
 */
function formatDuration(ms) {
    if (ms < 1000)
        return `${ms}ms`;
    if (ms < 60_000)
        return `${(ms / 1000).toFixed(1)}s`;
    if (ms < 3600_000)
        return `${(ms / 60_000).toFixed(1)}m`;
    return `${(ms / 3600_000).toFixed(1)}h`;
}
/**
 * Create spend entries from ledger events.
 *
 * This function parses ledger events and extracts spend information
 * from events with kind="iteration_complete" or similar.
 */
function extractSpendFromLedger(ledgerEvents) {
    const entries = [];
    for (const event of ledgerEvents) {
        // Look for events that contain spend data
        if (event.kind === "iteration_complete" || event.kind === "backend_usage") {
            const data = event.data;
            if (data && event.taskId) {
                entries.push({
                    taskId: event.taskId,
                    backendId: data.backendId,
                    phase: data.phase,
                    usd: data.usd ?? 0,
                    tokens: data.tokens ?? 0,
                    wallTimeMs: data.wallTimeMs ?? 0,
                    iterations: 1,
                });
            }
        }
    }
    return entries;
}
//# sourceMappingURL=spend.js.map