import type { BackendEnv, CodingBackend, ImplementInput, ImplementOutput } from "./types";
/**
 * ClaudeCodeBackend shells out to the `claude` CLI for code implementation.
 *
 * Claude Code (Anthropic's coding assistant) supports headless operation
 * via the claude CLI with --print or --output-format json flags.
 */
export declare class ClaudeCodeBackend implements CodingBackend {
    private readonly opts;
    readonly id = "claude-code";
    constructor(opts?: {
        timeoutMs?: number;
    });
    implement(env: BackendEnv, input: ImplementInput): Promise<ImplementOutput>;
    private buildPrompt;
}
//# sourceMappingURL=claude-code.d.ts.map