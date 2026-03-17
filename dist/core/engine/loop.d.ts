import type { ProjectSpec } from "../spec/types";
import type { CodingBackend } from "../backends/types";
import type { WorkspaceManager } from "../workspace/manager";
export type EngineOptions = {
    repoRoot: string;
    spec: ProjectSpec;
    backend: CodingBackend;
    workspace: WorkspaceManager;
    taskId?: string;
    dryRun: boolean;
    json: boolean;
    streamBackend?: boolean;
};
export type RunOutcome = {
    ok: true;
    runId: string;
} | {
    ok: false;
    runId: string;
    exitCode: number;
    reason: string;
};
export declare class EngineLoop {
    run(opts: EngineOptions): Promise<RunOutcome>;
    private runOneTask;
    private toTaskBudgetConfig;
    private resolveValidators;
}
//# sourceMappingURL=loop.d.ts.map