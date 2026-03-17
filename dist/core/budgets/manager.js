"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetManager = void 0;
const tiers_1 = require("./tiers");
class BudgetManager {
    state;
    constructor(state) {
        this.state = state;
    }
    preflightOrThrow(args) {
        const usdAfter = this.state.usage.usd + (args.estimatedUsd ?? 0);
        const tokensAfter = this.state.usage.tokens + (args.estimatedTokens ?? 0);
        if (this.state.limits.usd !== undefined && usdAfter > this.state.limits.usd) {
            throw new Error("Budget limit exceeded (usd)");
        }
        if (this.state.limits.tokens !== undefined &&
            tokensAfter > this.state.limits.tokens) {
            throw new Error("Budget limit exceeded (tokens)");
        }
    }
    recordIteration(wallTimeMs) {
        this.state.addUsage({ wallTimeMs, iterations: 1 });
    }
    recordBackendUsage(args) {
        this.state.addUsage({ usd: args.usd ?? 0, tokens: args.tokens ?? 0 });
    }
    getTier(config) {
        if (!config)
            return this.state.exceededHardLimit().ok ? "optimal" : "hard";
        return (0, tiers_1.getBudgetTier)(this.state.usage, config);
    }
    shouldApplyDegrade(config) {
        return this.getTier(config) === "warning";
    }
    isAtHardCap(config) {
        if (!config)
            return !this.state.exceededHardLimit().ok;
        return (0, tiers_1.getBudgetStatus)(this.state.usage, config).isAtHardCap;
    }
    getStatus(config) {
        return (0, tiers_1.getBudgetStatus)(this.state.usage, config);
    }
    getState() {
        return this.state;
    }
}
exports.BudgetManager = BudgetManager;
//# sourceMappingURL=manager.js.map