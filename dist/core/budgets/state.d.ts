export type BudgetUsage = {
    usd: number;
    tokens: number;
    wallTimeMs: number;
    iterations: number;
};
export type BudgetLimits = {
    usd?: number;
    tokens?: number;
    wallTimeMs?: number;
    maxIterations?: number;
};
export declare class BudgetState {
    readonly limits: BudgetLimits;
    usage: BudgetUsage;
    constructor(limits: BudgetLimits);
    addUsage(delta: Partial<BudgetUsage>): void;
    exceededHardLimit(): {
        ok: true;
    } | {
        ok: false;
        reason: string;
    };
}
//# sourceMappingURL=state.d.ts.map