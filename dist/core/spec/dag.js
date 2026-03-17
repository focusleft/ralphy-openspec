"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTaskDAG = buildTaskDAG;
function buildTaskDAG(tasks) {
    const tasksById = new Map();
    for (const t of tasks) {
        if (tasksById.has(t.id)) {
            throw new Error(`Duplicate task id: ${t.id}`);
        }
        tasksById.set(t.id, t);
    }
    const indeg = new Map();
    const adj = new Map();
    for (const id of tasksById.keys()) {
        indeg.set(id, 0);
        adj.set(id, new Set());
    }
    for (const t of tasks) {
        const deps = t.deps ?? [];
        for (const dep of deps) {
            if (!tasksById.has(dep)) {
                throw new Error(`Task ${t.id} depends on missing task ${dep}`);
            }
            adj.get(dep).add(t.id);
            indeg.set(t.id, (indeg.get(t.id) ?? 0) + 1);
        }
    }
    const queue = [];
    for (const [id, d] of indeg.entries()) {
        if (d === 0)
            queue.push(id);
    }
    // Prefer higher priority first (stable-ish by id)
    queue.sort((a, b) => {
        const pa = tasksById.get(a)?.priority ?? 0;
        const pb = tasksById.get(b)?.priority ?? 0;
        if (pa !== pb)
            return pb - pa;
        return a.localeCompare(b);
    });
    const order = [];
    while (queue.length) {
        const id = queue.shift();
        order.push(id);
        for (const next of adj.get(id) ?? []) {
            indeg.set(next, (indeg.get(next) ?? 0) - 1);
            if (indeg.get(next) === 0) {
                queue.push(next);
                queue.sort((a, b) => {
                    const pa = tasksById.get(a)?.priority ?? 0;
                    const pb = tasksById.get(b)?.priority ?? 0;
                    if (pa !== pb)
                        return pb - pa;
                    return a.localeCompare(b);
                });
            }
        }
    }
    if (order.length !== tasksById.size) {
        const remaining = [...tasksById.keys()].filter((id) => !order.includes(id));
        throw new Error(`Cycle detected in task dependencies. Remaining: ${remaining.join(", ")}`);
    }
    return { tasksById, order };
}
//# sourceMappingURL=dag.js.map