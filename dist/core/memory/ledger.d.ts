import type { PersistenceLayer } from "./persistence";
export declare class LedgerLogger {
    private readonly persistence;
    private readonly runId;
    constructor(persistence: PersistenceLayer, runId: string);
    event(args: {
        taskId?: string;
        kind: string;
        message: string;
        data?: unknown;
    }): void;
}
//# sourceMappingURL=ledger.d.ts.map