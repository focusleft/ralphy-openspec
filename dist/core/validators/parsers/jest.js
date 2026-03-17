"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJestOutput = parseJestOutput;
function parseJestOutput(output) {
    const trimmed = output.trim();
    if (!trimmed)
        return [];
    return [
        {
            kind: "jest",
            level: "error",
            message: trimmed.slice(0, 4000),
        },
    ];
}
//# sourceMappingURL=jest.js.map