"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProject = validateProject;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const folders_1 = require("../core/folders");
async function exists(p) {
    try {
        await promises_1.default.access(p);
        return true;
    }
    catch {
        return false;
    }
}
async function validateProject(projectDir, tools) {
    const issues = [];
    const openspecDir = node_path_1.default.join(projectDir, "openspec");
    if (!(await exists(openspecDir))) {
        issues.push({
            level: "error",
            message: "Missing openspec directory. Run `ralphy-openspec init`.",
            path: "openspec/",
        });
        return issues;
    }
    for (const p of ["openspec/specs", "openspec/changes", "openspec/project.md"]) {
        if (!(await exists(node_path_1.default.join(projectDir, p)))) {
            issues.push({ level: "error", message: `Missing ${p}`, path: p });
        }
    }
    if (tools.includes("cursor")) {
        const p = ".cursor/prompts/ralphy-plan.md";
        if (!(await exists(node_path_1.default.join(projectDir, p)))) {
            issues.push({ level: "warning", message: `Missing ${p}`, path: p });
        }
    }
    if (tools.includes("claude-code")) {
        const p = ".claude/commands/ralphy-plan.md";
        if (!(await exists(node_path_1.default.join(projectDir, p)))) {
            issues.push({ level: "warning", message: `Missing ${p}`, path: p });
        }
    }
    if (tools.includes("opencode")) {
        const p = "AGENTS.md";
        if (!(await exists(node_path_1.default.join(projectDir, p)))) {
            issues.push({ level: "warning", message: `Missing ${p}`, path: p });
        }
    }
    const newRoot = node_path_1.default.join(projectDir, folders_1.DEFAULT_ROOT_DIR);
    const legacyRoot = node_path_1.default.join(projectDir, folders_1.LEGACY_ROOT_DIR);
    if (!(await exists(newRoot)) && (await exists(legacyRoot))) {
        issues.push({
            level: "warning",
            message: `Legacy folder detected. Consider migrating ${folders_1.LEGACY_ROOT_DIR}/ to ${folders_1.DEFAULT_ROOT_DIR}/`,
            path: folders_1.LEGACY_ROOT_DIR,
        });
    }
    return issues;
}
//# sourceMappingURL=validator.js.map