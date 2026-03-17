"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSpecSchema = void 0;
const zod_1 = require("zod");
const toNumber = (v) => {
    if (v === null || v === undefined)
        return undefined;
    if (typeof v === "number")
        return Number.isFinite(v) ? v : undefined;
    if (typeof v === "string") {
        const n = Number(v);
        return Number.isFinite(n) ? n : undefined;
    }
    return undefined;
};
const fileContractSchema = zod_1.z
    .object({
    allowed: zod_1.z.array(zod_1.z.string()).default([]),
    forbidden: zod_1.z.array(zod_1.z.string()).default([]),
    allow_new_files: zod_1.z.boolean().optional(),
    allowNewFiles: zod_1.z.boolean().optional(),
})
    .transform((v) => ({
    allowed: v.allowed ?? [],
    forbidden: v.forbidden ?? [],
    allowNewFiles: v.allowNewFiles ?? v.allow_new_files ?? true,
}));
const budgetTierSchema = zod_1.z
    .object({
    usd: zod_1.z.any().optional(),
    tokens: zod_1.z.any().optional(),
    time_minutes: zod_1.z.any().optional(),
    timeMinutes: zod_1.z.any().optional(),
    max_iterations: zod_1.z.any().optional(),
    maxIterations: zod_1.z.any().optional(),
})
    .transform((v) => ({
    usd: toNumber(v.usd),
    tokens: toNumber(v.tokens),
    timeMinutes: toNumber(v.timeMinutes ?? v.time_minutes),
    maxIterations: toNumber(v.maxIterations ?? v.max_iterations),
}));
const hardBudgetTierSchema = zod_1.z
    .object({
    usd: zod_1.z.any().optional(),
    tokens: zod_1.z.any().optional(),
    time_minutes: zod_1.z.any().optional(),
    timeMinutes: zod_1.z.any().optional(),
    max_iterations: zod_1.z.any(),
    maxIterations: zod_1.z.any().optional(),
})
    .transform((v) => ({
    usd: toNumber(v.usd),
    tokens: toNumber(v.tokens),
    timeMinutes: toNumber(v.timeMinutes ?? v.time_minutes),
    maxIterations: toNumber(v.maxIterations ?? v.max_iterations),
}))
    .refine((v) => typeof v.maxIterations === "number" && Number.isFinite(v.maxIterations), {
    message: "hard.max_iterations is required",
});
const taskBudgetSchema = zod_1.z
    .object({
    optimal: budgetTierSchema.optional(),
    warning: budgetTierSchema.optional(),
    hard: hardBudgetTierSchema.optional(),
})
    .partial();
const taskSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    title: zod_1.z.string().optional(),
    goal: zod_1.z.string().optional(),
    deps: zod_1.z.array(zod_1.z.string()).optional(),
    priority: zod_1.z.number().optional(),
    validators: zod_1.z.array(zod_1.z.string()).optional(),
    files_contract: fileContractSchema.optional(),
    filesContract: fileContractSchema.optional(),
    budget: taskBudgetSchema.optional(),
    sprint: zod_1.z
        .object({
        size: zod_1.z.enum(["XS", "S", "M", "L", "XL"]).optional(),
        intent: zod_1.z.enum(["fix", "feature", "refactor", "infra"]).optional(),
    })
        .optional(),
})
    .transform((v) => ({
    id: v.id,
    title: v.title,
    goal: v.goal,
    deps: v.deps,
    priority: v.priority,
    validators: v.validators,
    filesContract: (v.filesContract ?? v.files_contract),
    budget: v.budget,
    sprint: v.sprint,
}));
const validatorSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    run: zod_1.z.string().min(1),
    timeout_seconds: zod_1.z.any().optional(),
    timeoutSeconds: zod_1.z.any().optional(),
    parser: zod_1.z.string().optional(),
})
    .transform((v) => ({
    id: v.id,
    run: v.run,
    timeoutSeconds: toNumber(v.timeoutSeconds ?? v.timeout_seconds),
    parser: v.parser,
}));
const projectSchema = zod_1.z.object({
    name: zod_1.z.string().default("my-project"),
    repoRoot: zod_1.z.string().default("."),
    language: zod_1.z.string().optional(),
    packageManager: zod_1.z.string().optional(),
});
const defaultsSchema = zod_1.z
    .object({
    backend: zod_1.z.string().default("cursor"),
    workspaceMode: zod_1.z.enum(["worktree", "patch"]).default("patch"),
    checkpointMode: zod_1.z.enum(["commit", "patch"]).default("commit"),
    validators: zod_1.z.array(zod_1.z.string()).default([]),
})
    .partial()
    .transform((v) => ({
    backend: v.backend ?? "cursor",
    workspaceMode: v.workspaceMode ?? "patch",
    checkpointMode: v.checkpointMode ?? "commit",
    validators: v.validators ?? [],
}));
const policiesSchema = zod_1.z
    .object({
    scopeGuard: zod_1.z.enum(["off", "warn", "block"]).optional(),
})
    .partial()
    .optional();
const budgetsSchema = zod_1.z
    .object({
    run: zod_1.z
        .object({
        money_usd: zod_1.z.any().optional(),
        moneyUsd: zod_1.z.any().optional(),
        tokens: zod_1.z.any().optional(),
        wall_time_minutes: zod_1.z.any().optional(),
        wallTimeMinutes: zod_1.z.any().optional(),
        max_iterations_total: zod_1.z.any().optional(),
        maxIterationsTotal: zod_1.z.any().optional(),
    })
        .optional(),
    limits: zod_1.z
        .object({
        max_parallel_tasks: zod_1.z.any().optional(),
        maxParallelTasks: zod_1.z.any().optional(),
        max_parallel_validators: zod_1.z.any().optional(),
        maxParallelValidators: zod_1.z.any().optional(),
        command_timeout_seconds: zod_1.z.any().optional(),
        commandTimeoutSeconds: zod_1.z.any().optional(),
    })
        .optional(),
})
    .optional()
    .transform((v) => {
    if (!v)
        return undefined;
    return {
        run: v.run
            ? {
                moneyUsd: toNumber(v.run.moneyUsd ?? v.run.money_usd),
                tokens: toNumber(v.run.tokens),
                wallTimeMinutes: toNumber(v.run.wallTimeMinutes ?? v.run.wall_time_minutes),
                maxIterationsTotal: toNumber(v.run.maxIterationsTotal ?? v.run.max_iterations_total),
            }
            : undefined,
        limits: v.limits
            ? {
                maxParallelTasks: toNumber(v.limits.maxParallelTasks ?? v.limits.max_parallel_tasks),
                maxParallelValidators: toNumber(v.limits.maxParallelValidators ?? v.limits.max_parallel_validators),
                commandTimeoutSeconds: toNumber(v.limits.commandTimeoutSeconds ?? v.limits.command_timeout_seconds),
            }
            : undefined,
    };
});
const artifactsSchema = zod_1.z
    .object({
    enabled: zod_1.z.boolean().optional(),
    rootDir: zod_1.z.string().optional(),
    statusIcons: zod_1.z.enum(["emoji", "ascii", "none"]).optional(),
})
    .optional();
const sprintDefaultsSchema = zod_1.z
    .object({
    XS: taskBudgetSchema.optional(),
    S: taskBudgetSchema.optional(),
    M: taskBudgetSchema.optional(),
    L: taskBudgetSchema.optional(),
    XL: taskBudgetSchema.optional(),
})
    .partial()
    .optional();
const backendsSchema = zod_1.z.record(zod_1.z.string(), zod_1.z.object({
    command: zod_1.z.string(),
    modelTiers: zod_1.z.record(zod_1.z.string(), zod_1.z.record(zod_1.z.string(), zod_1.z.unknown())).optional(),
}));
exports.projectSpecSchema = zod_1.z
    .object({
    version: zod_1.z.string().default("1.0"),
    project: projectSchema.default({ name: "my-project", repoRoot: "." }),
    defaults: defaultsSchema.default({
        backend: "cursor",
        workspaceMode: "patch",
        checkpointMode: "commit",
        validators: [],
    }),
    policies: policiesSchema,
    sprint_defaults: sprintDefaultsSchema,
    sprintDefaults: sprintDefaultsSchema,
    budgets: budgetsSchema,
    backends: backendsSchema.optional(),
    validators: zod_1.z.array(validatorSchema).optional(),
    tasks: zod_1.z.array(taskSchema).default([]),
    artifacts: artifactsSchema,
})
    .transform((v) => ({
    version: v.version,
    project: v.project,
    defaults: v.defaults,
    policies: v.policies,
    sprintDefaults: v.sprintDefaults ?? v.sprint_defaults,
    budgets: v.budgets,
    backends: v.backends,
    validators: v.validators,
    tasks: v.tasks,
    artifacts: v.artifacts,
}));
//# sourceMappingURL=schemas.js.map