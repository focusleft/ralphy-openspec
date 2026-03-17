import type { ValidateContext, ValidateResult, Validator } from "./types";
export declare class ValidatorRunner {
    private readonly ctx;
    constructor(ctx: ValidateContext);
    runAll(validators: Validator[]): Promise<Record<string, ValidateResult>>;
    runOne(validator: Validator): Promise<ValidateResult>;
}
//# sourceMappingURL=runner.d.ts.map