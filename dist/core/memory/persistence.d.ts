export type RunStatus = "active" | "success" | "stopped" | "error";
export type TaskStatus = "pending" | "running" | "done" | "blocked" | "error";
export type LedgerEvent = {
    runId: string;
    taskId?: string;
    ts: string;
    kind: string;
    message: string;
    data?: unknown;
};
export declare class PersistenceLayer {
    private readonly db;
    constructor(dbPath: string);
    static openForRepo(repoRoot: string): Promise<PersistenceLayer>;
    close(): void;
    createRun(args: {
        runId: string;
        repoRoot: string;
        backendId?: string;
        workspaceMode?: string;
    }): void;
    finishRun(args: {
        runId: string;
        status: RunStatus;
    }): void;
    upsertTaskState(args: {
        runId: string;
        taskId: string;
        status: TaskStatus;
        phase?: string;
        iteration?: number;
        lastError?: string;
    }): void;
    appendLedger(event: LedgerEvent): void;
    listLedger(args: {
        runId: string;
        limit?: number;
    }): LedgerEvent[];
    listTasksForRun(args: {
        runId: string;
    }): Array<{
        taskId: string;
        status: TaskStatus;
        phase?: string;
        iteration: number;
        lastError?: string;
    }>;
    getLatestRun(): {
        runId: string;
        status: RunStatus;
        startedAt: string;
    } | null;
}
//# sourceMappingURL=persistence.d.ts.map