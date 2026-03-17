"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUpdateCommand = registerUpdateCommand;
const inquirer_1 = __importDefault(require("inquirer"));
const detector_1 = require("../utils/detector");
const installer_1 = require("../utils/installer");
const paths_1 = require("../utils/paths");
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
            message: "Which AI tools do you want to update templates for?",
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
function registerUpdateCommand(program) {
    program
        .command("update")
        .description("Update Ralph-OpenSpec templates in a project")
        .option("--dir <path>", "Target project directory (default: current directory)")
        .option("--tools <list>", "Comma-separated list: cursor,claude-code,opencode")
        .option("--force", "Overwrite existing files", false)
        .action(async (opts) => {
        const dir = (0, paths_1.resolveProjectDir)(opts.dir);
        const parsed = parseToolsArg(opts.tools);
        const detected = await (0, detector_1.detectExistingTools)(dir);
        const defaultTools = parsed ??
            (detected.length
                ? detected
                : ["cursor", "claude-code", "opencode"]);
        const tools = parsed ?? (await promptForTools(defaultTools));
        await (0, installer_1.installToolTemplates)(dir, tools, { force: opts.force });
        process.stdout.write(`Updated templates in ${dir}\nUpdated tools: ${tools.join(", ")}\n`);
    });
}
//# sourceMappingURL=update.js.map