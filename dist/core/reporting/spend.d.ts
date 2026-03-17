import type { BudgetUsage } from "../budgets/state";
export type SpendEntry = {
    taskId: string;
    backendId?: string;
    phase?: string;
    usd: number;
    tokens: number;
    wallTimeMs: number;
    iterations: number;
};
export type SpendBreakdown = {
    total: BudgetUsage;
    byTask: Map<string, BudgetUsage>;
    byBackend: Map<string, BudgetUsage>;
    byPhase: Map<string, BudgetUsage>;
    entries: SpendEntry[];
};
/**
 * Aggregate spend data from ledger events.
 *
 * This processes ledger events to build a breakdown of spending
 * by task, backend, and phase.
 */
export declare function aggregateSpend(events: SpendEntry[]): SpendBreakdown;
/**
 * Format spend breakdown as markdown report.
 */
export declare function formatSpendReport(breakdown: SpendBreakdown): string;
/**
 * Create spend entries from ledger events.
 *
 * This function parses ledger events and extracts spend information
 * from events with kind="iteration_complete" or similar.
 */
export declare function extractSpendFromLedger(ledgerEvents: Array<{
    taskId?: string;
    kind: string;
    data?: unknown;
}>): SpendEntry[];
//# sourceMappingURL=spend.d.ts.map