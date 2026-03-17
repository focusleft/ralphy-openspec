"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = __importDefault(require("node:path"));
const sprint_defaults_1 = require("./sprint-defaults");
const loader_1 = require("./loader");
(0, vitest_1.describe)("SPRINT_SIZE_DEFAULTS", () => {
    (0, vitest_1.it)("provides hard.maxIterations for all sizes", () => {
        for (const [size, budget] of Object.entries(sprint_defaults_1.SPRINT_SIZE_DEFAULTS)) {
            (0, vitest_1.expect)(budget.hard?.maxIterations, `missing hard.maxIterations for ${size}`).toBeTypeOf("number");
        }
    });
});
(0, vitest_1.describe)("mergeBudgetDefaults", () => {
    (0, vitest_1.it)("fills missing tiers but preserves explicit overrides", () => {
        const defaults = sprint_defaults_1.SPRINT_SIZE_DEFAULTS.M;
        const merged = (0, sprint_defaults_1.mergeBudgetDefaults)({ optimal: { usd: 9.99 }, hard: { maxIterations: 2 } }, defaults);
        (0, vitest_1.expect)(merged.optimal?.usd).toBe(9.99);
        (0, vitest_1.expect)(merged.warning?.usd).toBe(defaults.warning?.usd);
        (0, vitest_1.expect)(merged.hard?.usd).toBe(defaults.hard?.usd);
        (0, vitest_1.expect)(merged.hard?.maxIterations).toBe(2);
    });
});
(0, vitest_1.describe)("SpecLoader sprint defaults", () => {
    (0, vitest_1.it)("applies sprint size defaults when budget is absent", async () => {
        const tmp = await promises_1.default.mkdtemp(node_path_1.default.join(node_os_1.default.tmpdir(), "ralphy-spec-"));
        await promises_1.default.mkdir(node_path_1.default.join(tmp, "openspec"), { recursive: true });
        await promises_1.default.writeFile(node_path_1.default.join(tmp, "openspec", "project.yml"), [
            "version: '1.0'",
            "project:",
            "  name: demo",
            "defaults:",
            "  backend: noop",
            "tasks:",
            "  - id: t1",
            "    sprint:",
            "      size: M",
        ].join("\n"), "utf8");
        const loader = new loader_1.SpecLoader(tmp);
        const spec = await loader.loadProjectSpec();
        const t1 = spec.tasks.find((t) => t.id === "t1");
        (0, vitest_1.expect)(t1?.budget?.hard?.maxIterations).toBe(sprint_defaults_1.SPRINT_SIZE_DEFAULTS.M.hard?.maxIterations);
        (0, vitest_1.expect)(t1?.budget?.hard?.usd).toBe(sprint_defaults_1.SPRINT_SIZE_DEFAULTS.M.hard?.usd);
    });
});
//# sourceMappingURL=sprint-defaults.test.js.map