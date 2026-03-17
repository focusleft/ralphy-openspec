"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueSignature = issueSignature;
function issueSignature(i) {
    const file = i.file ?? "";
    const line = i.line ?? 0;
    const msg = i.message.replace(/\s+/g, " ").trim();
    return `${i.kind}|${file}|${line}|${msg}`;
}
//# sourceMappingURL=signatures.js.map