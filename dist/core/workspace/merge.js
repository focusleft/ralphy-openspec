"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeBranch = mergeBranch;
exports.applyPatch = applyPatch;
exports.generatePatch = generatePatch;
const execa_1 = require("execa");
/**
 * Merge a source branch into the current (or target) branch.
 *
 * Strategies:
 * - squash: Combines all commits into one (cleanest history)
 * - merge: Standard merge commit
 * - rebase: Rebase source onto target
 */
async function mergeBranch(opts) {
    const { repoRoot, sourceBranch, targetBranch, strategy, message } = opts;
    try {
        // If target branch specified, checkout to it first
        if (targetBranch) {
            await git(["checkout", targetBranch], repoRoot);
        }
        switch (strategy) {
            case "squash": {
                await git(["merge", "--squash", sourceBranch], repoRoot);
                const commitMsg = message ?? `Squash merge ${sourceBranch}`;
                await git(["commit", "-m", commitMsg], repoRoot);
                break;
            }
            case "merge": {
                const commitMsg = message ?? `Merge branch '${sourceBranch}'`;
                await git(["merge", sourceBranch, "-m", commitMsg], repoRoot);
                break;
            }
            case "rebase": {
                await git(["rebase", sourceBranch], repoRoot);
                break;
            }
        }
        const commitRef = await git(["rev-parse", "HEAD"], repoRoot);
        return { ok: true, commitRef };
    }
    catch (err) {
        return {
            ok: false,
            error: err?.message ?? String(err),
        };
    }
}
/**
 * Apply a patch file to the current working directory.
 */
async function applyPatch(opts) {
    try {
        const res = await (0, execa_1.execa)("git", ["apply", "--3way", "-"], {
            cwd: opts.repoRoot,
            input: opts.patchContent,
            stdio: ["pipe", "pipe", "pipe"],
            reject: false,
        });
        if (res.exitCode !== 0) {
            return { ok: false, error: res.stderr || "Patch apply failed" };
        }
        return { ok: true };
    }
    catch (err) {
        return { ok: false, error: err?.message ?? String(err) };
    }
}
/**
 * Generate a patch from changes between two refs.
 */
async function generatePatch(opts) {
    const { repoRoot, fromRef, toRef } = opts;
    const args = toRef ? ["diff", fromRef, toRef] : ["diff", fromRef];
    const res = await (0, execa_1.execa)("git", args, {
        cwd: repoRoot,
        stdio: "pipe",
    });
    return res.stdout;
}
async function git(args, cwd) {
    const res = await (0, execa_1.execa)("git", args, {
        cwd,
        stdio: "pipe",
        reject: false,
    });
    if (res.exitCode !== 0) {
        throw new Error(`git ${args.join(" ")} failed: ${res.stderr || res.stdout}`);
    }
    return res.stdout.trim();
}
//# sourceMappingURL=merge.js.map