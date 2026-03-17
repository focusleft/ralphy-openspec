export type MergeStrategy = "squash" | "merge" | "rebase";
export type MergeOptions = {
    repoRoot: string;
    sourceBranch: string;
    targetBranch?: string;
    strategy: MergeStrategy;
    message?: string;
};
export type MergeResult = {
    ok: boolean;
    commitRef?: string;
    error?: string;
};
/**
 * Merge a source branch into the current (or target) branch.
 *
 * Strategies:
 * - squash: Combines all commits into one (cleanest history)
 * - merge: Standard merge commit
 * - rebase: Rebase source onto target
 */
export declare function mergeBranch(opts: MergeOptions): Promise<MergeResult>;
/**
 * Apply a patch file to the current working directory.
 */
export declare function applyPatch(opts: {
    repoRoot: string;
    patchContent: string;
}): Promise<MergeResult>;
/**
 * Generate a patch from changes between two refs.
 */
export declare function generatePatch(opts: {
    repoRoot: string;
    fromRef: string;
    toRef?: string;
}): Promise<string>;
//# sourceMappingURL=merge.d.ts.map