"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCheckpointCommand = registerCheckpointCommand;
const node_path_1 = __importDefault(require("node:path"));
const patch_mode_1 = require("../core/workspace/patch-mode");
function registerCheckpointCommand(program) {
    program
        .command("checkpoint")
        .description("Create a manual checkpoint commit (patch-mode only)")
        .requiredOption("--task <taskId>", "Task id")
        .requiredOption("--message <message>", "Checkpoint message")
        .action(async (opts) => {
        const repoRoot = process.cwd();
        const ws = new patch_mode_1.PatchModeWorkspace(node_path_1.default.resolve(repoRoot));
        await ws.prepare(opts.task);
        const ref = await ws.checkpoint(opts.task, opts.message);
        process.stdout.write(`Checkpoint ${ref.ref}\n`);
    });
}
//# sourceMappingURL=checkpoint.js.map