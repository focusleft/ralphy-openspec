"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateFileContract = evaluateFileContract;
const minimatch_1 = require("minimatch");
function evaluateFileContract(args) {
    const { changedFiles, contract } = args;
    const allowed = contract.allowed ?? [];
    const forbidden = contract.forbidden ?? [];
    const allowNewFiles = contract.allowNewFiles ?? true;
    const violations = [];
    for (const { file, isNew } of changedFiles) {
        if (isNew && !allowNewFiles) {
            violations.push({ file, reason: "new_file_disallowed" });
            continue;
        }
        if (forbidden.some((pat) => (0, minimatch_1.minimatch)(file, pat, { dot: true }))) {
            violations.push({ file, reason: "forbidden" });
            continue;
        }
        if (allowed.length) {
            const ok = allowed.some((pat) => (0, minimatch_1.minimatch)(file, pat, { dot: true }));
            if (!ok) {
                violations.push({ file, reason: "not_allowed" });
            }
        }
    }
    return violations;
}
//# sourceMappingURL=file-contract.js.map