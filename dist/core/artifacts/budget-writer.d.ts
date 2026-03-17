export declare function writeBudgetReport(args: {
    repoRoot: string;
    rootDir?: string;
    runId: string;
    ledgerEvents: Array<{
        taskId?: string;
        kind: string;
        data?: unknown;
    }>;
}): Promise<void>;
//# sourceMappingURL=budget-writer.d.ts.map