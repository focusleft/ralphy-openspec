import type { ProjectSpec } from "./types";
export declare class SpecLoader {
    private readonly repoRoot;
    constructor(repoRoot: string);
    loadProjectSpec(): Promise<ProjectSpec>;
    private readFirstExisting;
}
//# sourceMappingURL=loader.d.ts.map