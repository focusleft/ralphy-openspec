import type { SprintIntent, SprintSize, TaskBudget } from "./types";
/**
 * Default sprint size -> default budgets (USD + max iterations).
 *
 * These are project defaults. Users SHOULD be able to override at the project-spec level
 * in the future; keep this mapping centralized to avoid hard-coding across the engine.
 */
export declare const SPRINT_SIZE_DEFAULTS: Record<SprintSize, TaskBudget>;
export type SprintIntentConstraints = {
    refactorAllowed: "none" | "limited" | "full";
    checkpointEveryIterations: number;
    validatorStrictness: "high" | "medium";
};
export declare const SPRINT_INTENT_CONSTRAINTS: Record<SprintIntent, SprintIntentConstraints>;
export declare function mergeBudgetDefaults(existing: TaskBudget | undefined, defaults: TaskBudget): TaskBudget;
//# sourceMappingURL=sprint-defaults.d.ts.map