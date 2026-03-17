import type { TaskSpec } from "./types";
export type TaskGraph = {
    tasksById: Map<string, TaskSpec>;
    order: string[];
};
export declare function buildTaskDAG(tasks: TaskSpec[]): TaskGraph;
//# sourceMappingURL=dag.d.ts.map