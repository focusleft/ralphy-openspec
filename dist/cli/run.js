"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRunCommand = registerRunCommand;
const node_path_1 = __importDefault(require("node:path"));
const loader_1 = require("../core/spec/loader");
const dag_1 = require("../core/spec/dag");
const claude_code_1 = require("../core/backends/claude-code");
const cursor_1 = require("../core/backends/cursor");
const noop_1 = require("../core/backends/noop");
const opencode_1 = require("../core/backends/opencode");
const patch_mode_1 = require("../core/workspace/patch-mode");
const worktree_mode_1 = require("../core/workspace/worktree-mode");
const loop_1 = require("../core/engine/loop");
function createBackend(id) {
    switch (id) {
        case "cursor":
            return new cursor_1.CursorBackend();
        case "opencode":
            return new opencode_1.OpenCodeBackend();
        case "claude-code":
            return new claude_code_1.ClaudeCodeBackend();
        case "noop":
            return new noop_1.NoopBackend("noop");
        default:
            // Fallback: treat as noop for unknown ids (but retain id for diagnostics).
            return new noop_1.NoopBackend(id);
    }
}
function registerRunCommand(program) {
    program
        .command("run")
        .description("Execute the ralphy-spec engine loop")
        .option("--backend <id>", "Backend id: cursor|opencode|claude-code|noop")
        .option("--workspace <mode>", "Workspace mode: worktree|patch")
        .option("--artifact-dir <dir>", "Override artifact root directory (enables artifacts)")
        .option("--task <taskId>", "Run a single task (skips dependency checks)")
        .option("--no-stream-backend", "Disable streaming backend stdout/stderr to the terminal (default: stream)")
        .option("--dry-run", "Validate spec and print plan only", false)
        .option("--json", "Machine-readable output", false)
        .addHelpText("after", `\nConcepts:\n` +
        `- Budget tiers: optimal -> warning -> hard. WARNING enables degrade behaviors; HARD blocks the task.\n` +
        `- Sprint sizing: XS/S/M/L/XL (optional per task via sprint.size).\n` +
        `- Sprint intent: fix|feature|refactor|infra (optional per task via sprint.intent).\n`)
        .action(async (opts) => {
        const repoRoot = process.cwd();
        const loader = new loader_1.SpecLoader(repoRoot);
        let spec;
        try {
            spec = await loader.loadProjectSpec();
        }
        catch (e) {
            process.stderr.write(e?.message ? String(e.message) : String(e));
            process.stderr.write("\n");
            process.exitCode = 4;
            return;
        }
        if (opts.artifactDir) {
            spec = {
                ...spec,
                artifacts: {
                    ...(spec.artifacts ?? {}),
                    enabled: true,
                    rootDir: opts.artifactDir,
                },
            };
        }
        // Always build DAG in run/dry-run to validate deps/cycles unless --task is used.
        try {
            if (!opts.task)
                (0, dag_1.buildTaskDAG)(spec.tasks ?? []);
        }
        catch (e) {
            process.stderr.write(e?.message ? String(e.message) : String(e));
            process.stderr.write("\n");
            process.exitCode = 4;
            return;
        }
        if (opts.dryRun) {
            const dag = (0, dag_1.buildTaskDAG)(spec.tasks ?? []);
            const plan = opts.task ? [opts.task] : dag.order;
            const out = { ok: true, dryRun: true, plan };
            process.stdout.write(opts.json ? JSON.stringify(out, null, 2) + "\n" : `${plan.join("\n")}\n`);
            return;
        }
        const backendId = opts.backend ?? spec.defaults.backend ?? "cursor";
        const workspaceMode = opts.workspace ?? spec.defaults.workspaceMode ?? "patch";
        const backend = createBackend(backendId);
        const workspace = workspaceMode === "worktree"
            ? new worktree_mode_1.WorktreeModeWorkspace(node_path_1.default.resolve(repoRoot))
            : new patch_mode_1.PatchModeWorkspace(node_path_1.default.resolve(repoRoot));
        const engine = new loop_1.EngineLoop();
        const outcome = await engine.run({
            repoRoot,
            spec,
            backend,
            workspace,
            taskId: opts.task,
            dryRun: false,
            json: opts.json,
            streamBackend: opts.streamBackend && !opts.json,
        });
        if (opts.json) {
            process.stdout.write(JSON.stringify(outcome, null, 2) + "\n");
        }
        else {
            process.stdout.write(outcome.ok ? `OK: ${outcome.runId}\n` : `STOP: ${outcome.runId} (${outcome.exitCode}) ${outcome.reason}\n`);
        }
        process.exitCode = outcome.ok ? 0 : outcome.exitCode;
    });
}
//# sourceMappingURL=run.js.map