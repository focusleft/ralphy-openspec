import type { FileContract } from "../spec/types";
import type { CheckpointRef, ContractViolation, WorkspaceContext, WorkspaceManager } from "./manager";
/**
 * WorktreeModeWorkspace uses git worktrees for task isolation.
 *
 * Each task runs in its own worktree branch, providing complete isolation
 * from the main working directory. Changes are merged back on success.
 */
export declare class WorktreeModeWorkspace implements WorkspaceManager {
    private readonly repoRoot;
    mode: "worktree";
    private readonly stateByTask;
    private readonly worktreeBase;
    constructor(repoRoot: string);
    prepare(taskId: string): Promise<WorkspaceContext>;
    getWorkingDir(taskId: string): string;
    getChangedFiles(taskId: string): Promise<Array<{
        file: string;
        isNew: boolean;
    }>>;
    enforceContract(taskId: string, contract: FileContract): Promise<ContractViolation[]>;
    checkpoint(taskId: string, message: string): Promise<CheckpointRef>;
    merge(taskId: string): Promise<void>;
    revert(taskId: string): Promise<void>;
    cleanup(taskId: string): Promise<void>;
    private git;
}
//# sourceMappingURL=worktree-mode.d.ts.map