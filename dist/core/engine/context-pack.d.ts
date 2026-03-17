import type { Issue, ValidateResult } from "../validators/types";
export type ContextPack = {
    text: string;
    size: "full" | "warning_shrunk";
};
export declare function buildContextPack(args: {
    tier: "optimal" | "warning" | "hard";
    taskId: string;
    validatorResults: Record<string, ValidateResult>;
    issues: Issue[];
}): ContextPack;
//# sourceMappingURL=context-pack.d.ts.map