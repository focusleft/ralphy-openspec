"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetExhaustedError = void 0;
class BudgetExhaustedError extends Error {
    name = "BudgetExhaustedError";
    constructor(message) {
        super(message);
    }
}
exports.BudgetExhaustedError = BudgetExhaustedError;
//# sourceMappingURL=errors.js.map