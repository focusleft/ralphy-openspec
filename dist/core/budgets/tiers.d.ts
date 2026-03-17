import type { BudgetUsage } from "./state";
export type BudgetTierName = "optimal" | "warning" | "hard";
export type BudgetTierConfig = {
    usd?: number;
    tokens?: number;
    timeMinutes?: number;
};
export type TaskBudgetConfig = {
    optimal: BudgetTierConfig;
    warning: BudgetTierConfig;
    hard: BudgetTierConfig & {
        maxIterations: number;
    };
};
export type BudgetStatus = {
    tier: BudgetTierName;
    usedUsd: number;
    usedTokens: number;
    usedTimeMs: number;
    usedIterations: number;
    usdPctOfOptimal: number | null;
    usdPctOfHard: number | null;
    tokensPctOfOptimal: number | null;
    tokensPctOfHard: number | null;
    timePctOfOptimal: number | null;
    timePctOfHard: number | null;
    isInWarning: boolean;
    isAtHardCap: boolean;
};
export declare function getBudgetTier(used: BudgetUsage, config: TaskBudgetConfig): BudgetTierName;
export declare function getBudgetStatus(used: BudgetUsage, config: TaskBudgetConfig): BudgetStatus;
//# sourceMappingURL=tiers.d.ts.map