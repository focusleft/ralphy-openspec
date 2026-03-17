"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILES = exports.FOLDERS = exports.DEFAULT_ROOT_DIR = exports.LEGACY_ROOT_DIR = void 0;
exports.getRalphyRoot = getRalphyRoot;
exports.ensureRalphyFolders = ensureRalphyFolders;
exports.migrateLegacyIfNeeded = migrateLegacyIfNeeded;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
exports.LEGACY_ROOT_DIR = ".ralphy";
exports.DEFAULT_ROOT_DIR = "ralphy-spec";
exports.FOLDERS = {
    runs: "runs",
    logs: "logs",
    worktrees: "worktrees",
    tasks: "tasks",
};
exports.FILES = {
    db: "state.db",
    status: "STATUS.md",
    tasks: "TASKS.md",
    budget: "BUDGET.md",
};
function getRalphyRoot(repoRoot, overrideDir) {
    return node_path_1.default.join(repoRoot, overrideDir ?? exports.DEFAULT_ROOT_DIR);
}
async function ensureRalphyFolders(repoRoot, overrideDir) {
    const root = getRalphyRoot(repoRoot, overrideDir);
    await promises_1.default.mkdir(root, { recursive: true });
    await promises_1.default.mkdir(node_path_1.default.join(root, exports.FOLDERS.runs), { recursive: true });
    await promises_1.default.mkdir(node_path_1.default.join(root, exports.FOLDERS.logs), { recursive: true });
    await promises_1.default.mkdir(node_path_1.default.join(root, exports.FOLDERS.worktrees), { recursive: true });
    await promises_1.default.mkdir(node_path_1.default.join(root, exports.FOLDERS.tasks), { recursive: true });
    return root;
}
async function migrateLegacyIfNeeded(repoRoot, overrideDir) {
    const legacy = node_path_1.default.join(repoRoot, exports.LEGACY_ROOT_DIR);
    const next = getRalphyRoot(repoRoot, overrideDir);
    const legacyExists = await exists(legacy);
    const nextExists = await exists(next);
    if (!legacyExists || nextExists)
        return { migrated: false };
    await fs_extra_1.default.copy(legacy, next, { overwrite: false, errorOnExist: false });
    return { migrated: true, from: legacy, to: next };
}
async function exists(p) {
    try {
        await promises_1.default.access(p);
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=folders.js.map