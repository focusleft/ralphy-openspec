"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectScopeViolations = detectScopeViolations;
const minimatch_1 = require("minimatch");
function matchesAny(file, globs) {
    return globs.some((g) => (0, minimatch_1.minimatch)(file, g, { dot: true }));
}
function detectScopeViolations(args) {
    const intent = args.task.sprint?.intent;
    if (!intent)
        return [];
    // If a file contract exists, use it as the primary scope boundary.
    const allowed = args.task.filesContract?.allowed ?? [];
    // Very small "fix" tasks should stay tight.
    const maxFiles = intent === "fix" ? 5 : intent === "feature" ? 20 : intent === "infra" ? 50 : Infinity;
    const violations = [];
    if (args.changedFiles.length > maxFiles) {
        violations.push({
            message: `Scope violation: "${intent}" intent changed ${args.changedFiles.length} files (max ${maxFiles}).`,
        });
    }
    if (intent === "fix" && allowed.length) {
        for (const cf of args.changedFiles) {
            if (!matchesAny(cf.file, allowed)) {
                violations.push({
                    file: cf.file,
                    message: `Scope violation: "${intent}" intent changed file outside allowed scope: ${cf.file}`,
                });
            }
        }
    }
    return violations;
}
//# sourceMappingURL=scope-detector.js.map