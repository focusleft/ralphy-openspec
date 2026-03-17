import type { BudgetStatus } from "../budgets/tiers";
export type StatusWriterInput = {
    repoRoot: string;
    rootDir?: string;
    runId: string;
    backendId?: string;
    workspaceMode?: string;
    phase: string;
    taskId?: string;
    iteration?: number;
    message?: string;
    tier?: "optimal" | "warning" | "hard";
    budgetStatus?: BudgetStatus | null;
};
export declare function writeStatus(input: StatusWriterInput): Promise<void>;
//# sourceMappingURL=status-writer.d.ts.map