"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./cli/init");
const validate_1 = require("./cli/validate");
const update_1 = require("./cli/update");
const run_1 = require("./cli/run");
const status_1 = require("./cli/status");
const report_1 = require("./cli/report");
const tail_1 = require("./cli/tail");
const checkpoint_1 = require("./cli/checkpoint");
const budget_1 = require("./cli/budget");
function buildProgram() {
    const program = new commander_1.Command();
    program
        .name("ralphy-spec")
        .description("One-command setup for Ralph loop + OpenSpec workflows across Cursor, OpenCode, and Claude Code.")
        .version("0.3.6");
    (0, init_1.registerInitCommand)(program);
    (0, validate_1.registerValidateCommand)(program);
    (0, update_1.registerUpdateCommand)(program);
    (0, run_1.registerRunCommand)(program);
    (0, status_1.registerStatusCommand)(program);
    (0, budget_1.registerBudgetCommand)(program);
    (0, report_1.registerReportCommand)(program);
    (0, tail_1.registerTailCommand)(program);
    (0, checkpoint_1.registerCheckpointCommand)(program);
    return program;
}
async function main() {
    const program = buildProgram();
    await program.parseAsync(process.argv);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
//# sourceMappingURL=index.js.map