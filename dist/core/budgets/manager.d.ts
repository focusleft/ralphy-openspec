import { BudgetState } from "./state";
import type { TaskBudgetConfig } from "./tiers";
export declare class BudgetManager {
    private readonly state;
    constructor(state: BudgetState);
    preflightOrThrow(args: {
        estimatedUsd?: number;
        estimatedTokens?: number;
    }): void;
    recordIteration(wallTimeMs: number): void;
    recordBackendUsage(args: {
        usd?: number;
        tokens?: number;
    }): void;
    getTier(config?: TaskBudgetConfig): "optimal" | "warning" | "hard";
    shouldApplyDegrade(config?: TaskBudgetConfig): boolean;
    isAtHardCap(config?: TaskBudgetConfig): boolean;
    getStatus(config: TaskBudgetConfig): import("./tiers").BudgetStatus;
    getState(): BudgetState;
}
//# sourceMappingURL=manager.d.ts.map