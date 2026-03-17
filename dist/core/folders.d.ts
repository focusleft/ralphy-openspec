export declare const LEGACY_ROOT_DIR = ".ralphy";
export declare const DEFAULT_ROOT_DIR = "ralphy-spec";
export declare const FOLDERS: {
    readonly runs: "runs";
    readonly logs: "logs";
    readonly worktrees: "worktrees";
    readonly tasks: "tasks";
};
export declare const FILES: {
    readonly db: "state.db";
    readonly status: "STATUS.md";
    readonly tasks: "TASKS.md";
    readonly budget: "BUDGET.md";
};
export declare function getRalphyRoot(repoRoot: string, overrideDir?: string): string;
export declare function ensureRalphyFolders(repoRoot: string, overrideDir?: string): Promise<string>;
export declare function migrateLegacyIfNeeded(repoRoot: string, overrideDir?: string): Promise<{
    migrated: false;
    from?: undefined;
    to?: undefined;
} | {
    migrated: true;
    from: string;
    to: string;
}>;
//# sourceMappingURL=folders.d.ts.map