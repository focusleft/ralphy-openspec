"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecLoader = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const yaml_1 = __importDefault(require("yaml"));
const zod_1 = require("zod");
const schemas_1 = require("./schemas");
const sprint_defaults_1 = require("./sprint-defaults");
class SpecLoader {
    repoRoot;
    constructor(repoRoot) {
        this.repoRoot = repoRoot;
    }
    async loadProjectSpec() {
        const ymlPath = node_path_1.default.join(this.repoRoot, "openspec", "project.yml");
        const jsonPath = node_path_1.default.join(this.repoRoot, "openspec", "project.json");
        const rawText = await this.readFirstExisting([ymlPath, jsonPath]);
        const raw = rawText.kind === "yml" ? yaml_1.default.parse(rawText.text) : JSON.parse(rawText.text);
        try {
            const spec = schemas_1.projectSpecSchema.parse(raw);
            const tasks = (spec.tasks ?? []).map((t) => {
                const size = t.sprint?.size;
                if (!size)
                    return t;
                const defaults = spec.sprintDefaults?.[size] ?? sprint_defaults_1.SPRINT_SIZE_DEFAULTS[size];
                if (!defaults)
                    return t;
                return { ...t, budget: (0, sprint_defaults_1.mergeBudgetDefaults)(t.budget, defaults) };
            });
            return { ...spec, tasks };
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                const pretty = err.issues
                    .map((i) => `- ${i.path.join(".") || "(root)"}: ${i.message}`)
                    .join("\n");
                throw new Error(`Invalid OpenSpec project spec:\n${pretty}`);
            }
            throw err;
        }
    }
    async readFirstExisting(candidates) {
        for (const p of candidates) {
            try {
                const text = await promises_1.default.readFile(p, "utf8");
                return { kind: p.endsWith(".json") ? "json" : "yml", path: p, text };
            }
            catch {
                // continue
            }
        }
        throw new Error(`Missing OpenSpec project file. Expected one of:\n${candidates
            .map((p) => `- ${p}`)
            .join("\n")}`);
    }
}
exports.SpecLoader = SpecLoader;
//# sourceMappingURL=loader.js.map