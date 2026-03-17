import type { FileContract } from "../spec/types";
import { type ContractViolation } from "../spec/file-contract";
import type { Issue } from "../validators/types";
export type EnforcementResult = {
    violations: ContractViolation[];
    revertedFiles: string[];
    issues: Issue[];
};
/**
 * ContractEnforcer handles automatic reversion of files that violate contracts.
 *
 * Unlike WorkspaceManager.enforceContract which reverts ALL changes on violation,
 * this enforcer can selectively revert only the violating files.
 */
export declare class ContractEnforcer {
    private readonly repoRoot;
    constructor(repoRoot: string);
    /**
     * Check changed files against a contract and auto-revert violations.
     *
     * @param changedFiles - List of changed files with isNew flag
     * @param contract - The file contract to enforce
     * @param autoRevert - If true, automatically revert violating files
     * @returns Enforcement result with violations, reverted files, and issues
     */
    enforce(args: {
        changedFiles: Array<{
            file: string;
            isNew: boolean;
        }>;
        contract: FileContract;
        autoRevert?: boolean;
    }): Promise<EnforcementResult>;
    /**
     * Revert a single file to its last committed state.
     */
    private revertFile;
    /**
     * Get list of changed files in the working directory.
     */
    getChangedFiles(): Promise<Array<{
        file: string;
        isNew: boolean;
    }>>;
}
/**
 * Quick helper to enforce contract on current changes.
 */
export declare function enforceFileContract(args: {
    repoRoot: string;
    contract: FileContract;
    autoRevert?: boolean;
}): Promise<EnforcementResult>;
//# sourceMappingURL=contract-enforcer.d.ts.map