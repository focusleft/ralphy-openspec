import type { TaskSpec } from "../spec/types";
export type ConstraintViolation = {
    kind: "scope_violation";
    level: "error";
    message: string;
    file?: string;
    raw?: unknown;
};
export declare function enforceSprintConstraints(args: {
    task: TaskSpec;
    changedFiles: Array<{
        file: string;
        isNew: boolean;
    }>;
}): ConstraintViolation[];
//# sourceMappingURL=constraints.d.ts.map