"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopBackend = void 0;
class NoopBackend {
    id;
    constructor(id) {
        this.id = id;
    }
    async implement() {
        return {
            ok: true,
            message: "Noop backend: no code changes performed. Use validators/contracts to verify desired state.",
        };
    }
}
exports.NoopBackend = NoopBackend;
//# sourceMappingURL=noop.js.map