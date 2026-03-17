"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetState = void 0;
class BudgetState {
    limits;
    usage = { usd: 0, tokens: 0, wallTimeMs: 0, iterations: 0 };
    constructor(limits) {
        this.limits = limits;
    }
    addUsage(delta) {
        this.usage = {
            usd: this.usage.usd + (delta.usd ?? 0),
            tokens: this.usage.tokens + (delta.tokens ?? 0),
            wallTimeMs: this.usage.wallTimeMs + (delta.wallTimeMs ?? 0),
            iterations: this.usage.iterations + (delta.iterations ?? 0),
        };
    }
    exceededHardLimit() {
        const { usd, tokens, wallTimeMs, iterations } = this.usage;
        const lim = this.limits;
        if (lim.usd !== undefined && usd > lim.usd)
            return { ok: false, reason: "usd" };
        if (lim.tokens !== undefined && tokens > lim.tokens)
            return { ok: false, reason: "tokens" };
        if (lim.wallTimeMs !== undefined && wallTimeMs > lim.wallTimeMs)
            return { ok: false, reason: "wall_time" };
        if (lim.maxIterations !== undefined && iterations > lim.maxIterations)
            return { ok: false, reason: "iterations" };
        return { ok: true };
    }
}
exports.BudgetState = BudgetState;
//# sourceMappingURL=state.js.map