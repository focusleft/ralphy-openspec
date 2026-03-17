"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const failure_summary_1 = require("./failure-summary");
(0, vitest_1.describe)("buildFailureSummary", () => {
    (0, vitest_1.it)("includes required sections", () => {
        const md = (0, failure_summary_1.buildFailureSummary)({
            runId: "run_123",
            taskId: "task_a",
            reason: "Hard cap reached",
            tier: "hard",
            lastIssues: [{ message: "Boom", level: "error", kind: "test", file: "a.ts" }],
            suggestedSteps: ["Do X", "Do Y"],
        });
        (0, vitest_1.expect)(md).toContain("# Task blocked");
        (0, vitest_1.expect)(md).toContain("## Last issues");
        (0, vitest_1.expect)(md).toContain("## Suggested manual steps");
        (0, vitest_1.expect)(md).toContain("Hard cap reached");
        (0, vitest_1.expect)(md).toContain("Boom");
    });
});
//# sourceMappingURL=failure-summary.test.js.map