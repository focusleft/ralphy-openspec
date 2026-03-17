"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorRunner = void 0;
const execa_1 = require("execa");
const tsc_1 = require("./parsers/tsc");
const eslint_1 = require("./parsers/eslint");
const jest_1 = require("./parsers/jest");
function parseIssues(parser, combinedOutput) {
    switch (parser) {
        case "tsc":
            return (0, tsc_1.parseTscOutput)(combinedOutput);
        case "eslint":
            return (0, eslint_1.parseEslintOutput)(combinedOutput);
        case "jest":
            return (0, jest_1.parseJestOutput)(combinedOutput);
        default:
            return combinedOutput.trim()
                ? [
                    {
                        kind: "unknown",
                        level: "error",
                        message: combinedOutput.trim().slice(0, 4000),
                    },
                ]
                : [];
    }
}
class ValidatorRunner {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
    }
    async runAll(validators) {
        const results = {};
        for (const v of validators) {
            results[v.id] = await this.runOne(v);
        }
        return results;
    }
    async runOne(validator) {
        const started = Date.now();
        const timeoutMs = validator.timeoutMs ?? this.ctx.commandTimeoutMs;
        try {
            const res = await (0, execa_1.execa)(validator.run, {
                cwd: this.ctx.cwd,
                shell: true,
                timeout: timeoutMs,
                reject: false,
                stdio: "pipe",
            });
            const stdout = res.stdout ?? "";
            const stderr = res.stderr ?? "";
            const combined = [stdout, stderr].filter(Boolean).join("\n");
            const issues = parseIssues(validator.parser, combined);
            return {
                ok: res.exitCode === 0,
                exitCode: res.exitCode ?? null,
                durationMs: Date.now() - started,
                issues,
                stdout,
                stderr,
            };
        }
        catch (err) {
            const msg = err?.message ? String(err.message) : String(err);
            return {
                ok: false,
                exitCode: null,
                durationMs: Date.now() - started,
                issues: [
                    {
                        kind: "unknown",
                        level: "error",
                        message: msg,
                        raw: err,
                    },
                ],
                stdout: "",
                stderr: "",
            };
        }
    }
}
exports.ValidatorRunner = ValidatorRunner;
//# sourceMappingURL=runner.js.map