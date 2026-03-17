import type { BudgetStatus } from "../budgets/tiers";
export type FailureSummaryIssue = {
    level?: string;
    kind?: string;
    message: string;
    file?: string;
};
export type FailureSummaryInput = {
    runId: string;
    taskId: string;
    reason: string;
    tier?: "optimal" | "warning" | "hard";
    budgetStatus?: BudgetStatus | null;
    lastIssues?: FailureSummaryIssue[] | null;
    ledgerEvents?: Array<{
        taskId?: string;
        kind: string;
        data?: unknown;
    }> | null;
    suggestedSteps?: string[] | null;
};
export declare function buildFailureSummary(input: FailureSummaryInput): string;
//# sourceMappingURL=failure-summary.d.ts.map