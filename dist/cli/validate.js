"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidateCommand = registerValidateCommand;
const detector_1 = require("../utils/detector");
const paths_1 = require("../utils/paths");
const validator_1 = require("../utils/validator");
const loader_1 = require("../core/spec/loader");
const runner_1 = require("../core/validators/runner");
function parseToolsArg(arg) {
    if (!arg)
        return undefined;
    const parts = arg
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const allowed = ["cursor", "claude-code", "opencode"];
    const tools = [];
    for (const p of parts) {
        if (allowed.includes(p))
            tools.push(p);
    }
    return tools.length ? tools : undefined;
}
function registerValidateCommand(program) {
    program
        .command("validate")
        .description("Validate that Ralph-OpenSpec setup is complete")
        .option("--dir <path>", "Target project directory (default: current directory)")
        .option("--task <taskId>", "Validate a specific task via validators (v2)")
        .option("--tools <list>", "Comma-separated list: cursor,claude-code,opencode (default: detect)")
        .action(async (opts) => {
        const dir = (0, paths_1.resolveProjectDir)(opts.dir);
        if (opts.task) {
            try {
                const loader = new loader_1.SpecLoader(dir);
                const spec = await loader.loadProjectSpec();
                const task = (spec.tasks ?? []).find((t) => t.id === opts.task);
                if (!task) {
                    process.stderr.write(`Unknown task id: ${opts.task}\n`);
                    process.exitCode = 4;
                    return;
                }
                const ids = task.validators ?? spec.defaults.validators ?? [];
                const validators = (spec.validators ?? [])
                    .filter((v) => ids.includes(v.id))
                    .map((v) => ({
                    id: v.id,
                    run: v.run,
                    timeoutMs: v.timeoutSeconds ? v.timeoutSeconds * 1000 : undefined,
                    parser: v.parser,
                })) ?? [];
                const runner = new runner_1.ValidatorRunner({
                    cwd: dir,
                    commandTimeoutMs: (spec.budgets?.limits?.commandTimeoutSeconds ?? 900) * 1000,
                });
                const results = await runner.runAll(validators);
                process.stdout.write(JSON.stringify({ ok: true, taskId: task.id, results }, null, 2) + "\n");
                const hasErrors = Object.values(results).some((r) => !r.ok);
                process.exitCode = hasErrors ? 1 : 0;
                return;
            }
            catch (e) {
                process.stderr.write(e?.message ? String(e.message) : String(e));
                process.stderr.write("\n");
                process.exitCode = 4;
                return;
            }
        }
        const tools = parseToolsArg(opts.tools) ?? (await (0, detector_1.detectExistingTools)(dir));
        const issues = await (0, validator_1.validateProject)(dir, tools);
        if (!issues.length) {
            process.stdout.write("OK: Ralph-OpenSpec setup looks good.\n");
            return;
        }
        for (const issue of issues) {
            const prefix = issue.level === "error" ? "ERROR" : "WARN";
            process.stdout.write(`${prefix}: ${issue.message}${issue.path ? ` (${issue.path})` : ""}\n`);
        }
        const hasErrors = issues.some((i) => i.level === "error");
        process.exitCode = hasErrors ? 1 : 0;
    });
}
//# sourceMappingURL=validate.js.map