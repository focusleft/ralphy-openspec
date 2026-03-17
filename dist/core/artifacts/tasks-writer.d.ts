import type { TaskSpec } from "../spec/types";
import type { TaskStatus } from "../memory/persistence";
export type StatusIconMode = "emoji" | "ascii" | "none";
export type TaskRow = {
    taskId: string;
    status: TaskStatus;
    phase?: string;
    iteration: number;
    lastError?: string;
};
export declare function writeTasksBoard(args: {
    repoRoot: string;
    rootDir?: string;
    runId: string;
    statusIcons?: StatusIconMode;
    specTasks: TaskSpec[];
    rows: TaskRow[];
}): Promise<void>;
//# sourceMappingURL=tasks-writer.d.ts.map