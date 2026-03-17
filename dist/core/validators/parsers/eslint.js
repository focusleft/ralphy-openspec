"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEslintOutput = parseEslintOutput;
function parseEslintOutput(output) {
    const trimmed = output.trim();
    if (!trimmed)
        return [];
    try {
        const json = JSON.parse(trimmed);
        const issues = [];
        for (const file of json) {
            for (const m of file.messages ?? []) {
                issues.push({
                    kind: "eslint",
                    level: m.severity === 1 ? "warning" : "error",
                    message: `${m.message}${m.ruleId ? ` (${m.ruleId})` : ""}`,
                    file: file.filePath,
                    line: m.line,
                    raw: m,
                });
            }
        }
        return issues;
    }
    catch {
        return [
            {
                kind: "eslint",
                level: "error",
                message: trimmed.slice(0, 4000),
            },
        ];
    }
}
//# sourceMappingURL=eslint.js.map