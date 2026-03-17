"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBudgetTier = getBudgetTier;
exports.getBudgetStatus = getBudgetStatus;
function pct(used, limit) {
    if (limit === undefined)
        return null;
    if (limit === 0)
        return used > 0 ? 1 : 0;
    return used / limit;
}
function getBudgetTier(used, config) {
    // HARD if any configured hard metric reached (or iterations)
    if (used.iterations >= config.hard.maxIterations)
        return "hard";
    const hardUsd = config.hard.usd;
    const hardTokens = config.hard.tokens;
    const hardTimeMs = config.hard.timeMinutes !== undefined ? config.hard.timeMinutes * 60_000 : undefined;
    if (hardUsd !== undefined && used.usd >= hardUsd)
        return "hard";
    if (hardTokens !== undefined && used.tokens >= hardTokens)
        return "hard";
    if (hardTimeMs !== undefined && used.wallTimeMs >= hardTimeMs)
        return "hard";
    // WARNING if any configured "optimal" threshold crossed (or explicit warning threshold)
    const optUsd = config.optimal.usd;
    const optTokens = config.optimal.tokens;
    const optTimeMs = config.optimal.timeMinutes !== undefined ? config.optimal.timeMinutes * 60_000 : undefined;
    const warnUsd = config.warning.usd;
    const warnTokens = config.warning.tokens;
    const warnTimeMs = config.warning.timeMinutes !== undefined ? config.warning.timeMinutes * 60_000 : undefined;
    const crossedUsd = (optUsd !== undefined && used.usd >= optUsd) ||
        (warnUsd !== undefined && used.usd >= warnUsd);
    const crossedTokens = (optTokens !== undefined && used.tokens >= optTokens) ||
        (warnTokens !== undefined && used.tokens >= warnTokens);
    const crossedTime = (optTimeMs !== undefined && used.wallTimeMs >= optTimeMs) ||
        (warnTimeMs !== undefined && used.wallTimeMs >= warnTimeMs);
    if (crossedUsd || crossedTokens || crossedTime)
        return "warning";
    return "optimal";
}
function getBudgetStatus(used, config) {
    const tier = getBudgetTier(used, config);
    const hardTimeMs = config.hard.timeMinutes !== undefined ? config.hard.timeMinutes * 60_000 : undefined;
    const optTimeMs = config.optimal.timeMinutes !== undefined ? config.optimal.timeMinutes * 60_000 : undefined;
    const isAtHardCap = tier === "hard" ||
        used.iterations >= config.hard.maxIterations ||
        (config.hard.usd !== undefined && used.usd >= config.hard.usd) ||
        (config.hard.tokens !== undefined && used.tokens >= config.hard.tokens) ||
        (hardTimeMs !== undefined && used.wallTimeMs >= hardTimeMs);
    return {
        tier,
        usedUsd: used.usd,
        usedTokens: used.tokens,
        usedTimeMs: used.wallTimeMs,
        usedIterations: used.iterations,
        usdPctOfOptimal: pct(used.usd, config.optimal.usd),
        usdPctOfHard: pct(used.usd, config.hard.usd),
        tokensPctOfOptimal: pct(used.tokens, config.optimal.tokens),
        tokensPctOfHard: pct(used.tokens, config.hard.tokens),
        timePctOfOptimal: pct(used.wallTimeMs, optTimeMs),
        timePctOfHard: pct(used.wallTimeMs, hardTimeMs),
        isInWarning: tier === "warning",
        isAtHardCap,
    };
}
//# sourceMappingURL=tiers.js.map