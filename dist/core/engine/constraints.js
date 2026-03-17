"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceSprintConstraints = enforceSprintConstraints;
function enforceSprintConstraints(args) {
    const size = args.task.sprint?.size;
    if (!size)
        return [];
    const newFiles = args.changedFiles.filter((f) => f.isNew);
    const violations = [];
    const maxNew = size === "XS" ? 0 : size === "S" ? 0 : size === "M" ? 2 : size === "L" ? 10 : Infinity;
    if (newFiles.length > maxNew) {
        violations.push({
            kind: "scope_violation",
            level: "error",
            message: `Sprint size ${size} allows at most ${maxNew} new files, but found ${newFiles.length}.`,
            raw: { size, maxNew, newFiles },
        });
    }
    return violations;
}
//# sourceMappingURL=constraints.js.map