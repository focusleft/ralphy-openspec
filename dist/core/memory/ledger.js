"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerLogger = void 0;
class LedgerLogger {
    persistence;
    runId;
    constructor(persistence, runId) {
        this.persistence = persistence;
        this.runId = runId;
    }
    event(args) {
        const ev = {
            runId: this.runId,
            taskId: args.taskId,
            ts: new Date().toISOString(),
            kind: args.kind,
            message: args.message,
            data: args.data,
        };
        this.persistence.appendLedger(ev);
    }
}
exports.LedgerLogger = LedgerLogger;
//# sourceMappingURL=ledger.js.map