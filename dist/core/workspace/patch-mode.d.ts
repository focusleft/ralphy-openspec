import type { FileContract } from "../spec/types";
import type { CheckpointRef, ContractViolation, WorkspaceContext, WorkspaceManager } from "./manager";
export declare class PatchModeWorkspace implements WorkspaceManager {
    private readonly repoRoot;
    mode: "patch";
    private readonly stateByTask;
    constructor(repoRoot: string);
    prepare(taskId: string): Promise<WorkspaceContext>;
    getWorkingDir(_taskId: string): string;
    getChangedFiles(_taskId: string): Promise<Array<{
        file: string;
        isNew: boolean;
    }>>;
    enforceContract(taskId: string, contract: FileContract): Promise<ContractViolation[]>;
    checkpoint(taskId: string, message: string): Promise<CheckpointRef>;
    merge(_taskId: string): Promise<void>;
    revert(taskId: string): Promise<void>;
    cleanup(_taskId: string): Promise<void>;
    private git;
}
export declare function getPatchWorkspaceRoot(repoRoot: string): string;
//# sourceMappingURL=patch-mode.d.ts.map