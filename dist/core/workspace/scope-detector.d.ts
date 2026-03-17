import type { TaskSpec } from "../spec/types";
export type ScopeViolation = {
    file?: string;
    message: string;
};
export declare function detectScopeViolations(args: {
    task: TaskSpec;
    changedFiles: Array<{
        file: string;
        isNew: boolean;
    }>;
}): ScopeViolation[];
//# sourceMappingURL=scope-detector.d.ts.map