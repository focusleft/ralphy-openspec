"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerInitCommand = registerInitCommand;
const inquirer_1 = __importDefault(require("inquirer"));
const detector_1 = require("../utils/detector");
const installer_1 = require("../utils/installer");
const paths_1 = require("../utils/paths");
const folders_1 = require("../core/folders");
function parseToolsArg(arg) {
    if (!arg)
        return undefined;
    const parts = arg
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const allowed = ["cursor", "claude-code", "opencode"];
    const tools = [];
    for (const p of parts) {
        if (allowed.includes(p))
            tools.push(p);
    }
    return tools.length ? tools : undefined;
}
async function promptForTools(defaultTools) {
    const { tools } = await inquirer_1.default.prompt([
        {
            type: "checkbox",
            name: "tools",
            message: "Which AI tools do you want to configure?",
            choices: [
                { name: "Cursor", value: "cursor" },
                { name: "Claude Code", value: "claude-code" },
                { name: "OpenCode", value: "opencode" },
            ],
            default: defaultTools,
        },
    ]);
    return tools;
}
function registerInitCommand(program) {
    program
        .command("init")
        .description("Initialize Ralph + OpenSpec workflow files in a project")
        .option("--dir <path>", "Target project directory (default: current directory)")
        .option("--tools <list>", "Comma-separated list: cursor,claude-code,opencode")
        .option("--force", "Overwrite existing files", false)
        .action(async (opts) => {
        const options = {
            dir: (0, paths_1.resolveProjectDir)(opts.dir),
            tools: parseToolsArg(opts.tools),
            force: opts.force,
        };
        const detected = await (0, detector_1.detectExistingTools)(options.dir);
        const defaultTools = options.tools ??
            (detected.length
                ? detected
                : ["cursor", "claude-code", "opencode"]);
        const tools = options.tools ?? (await promptForTools(defaultTools));
        await (0, installer_1.ensureOpenSpecScaffold)(options.dir);
        await (0, installer_1.installToolTemplates)(options.dir, tools, { force: options.force });
        await (0, folders_1.ensureRalphyFolders)(options.dir);
        process.stdout.write(`Initialized Ralph-OpenSpec in ${options.dir}\nConfigured tools: ${tools.join(", ")}\n`);
        process.stdout.write(`\nArtifact folder created: ${(0, folders_1.getRalphyRoot)(options.dir)}\n` +
            `\n.gitignore suggestions:\n` +
            `- Commit: ${(0, folders_1.getRalphyRoot)(options.dir)}/STATUS.md, ${(0, folders_1.getRalphyRoot)(options.dir)}/TASKS.md, ${(0, folders_1.getRalphyRoot)(options.dir)}/BUDGET.md\n` +
            `- Ignore: ${(0, folders_1.getRalphyRoot)(options.dir)}/state.db, ${(0, folders_1.getRalphyRoot)(options.dir)}/runs/, ${(0, folders_1.getRalphyRoot)(options.dir)}/logs/, ${(0, folders_1.getRalphyRoot)(options.dir)}/worktrees/\n`);
    });
}
//# sourceMappingURL=init.js.map