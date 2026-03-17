export declare function writeRunLogOnce(args: {
    repoRoot: string;
    rootDir?: string;
    runId: string;
    outcome: {
        ok: boolean;
        exitCode?: number;
        reason?: string;
    };
    ledgerEvents: Array<{
        ts: string;
        kind: string;
        message: string;
        taskId?: string;
    }>;
}): Promise<{
    path: string;
    created: boolean;
}>;
//# sourceMappingURL=run-log-writer.d.ts.map