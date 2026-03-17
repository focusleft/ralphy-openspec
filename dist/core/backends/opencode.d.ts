import type { BackendEnv, CodingBackend, ImplementInput, ImplementOutput } from "./types";
/**
 * OpenCodeBackend shells out to the `opencode` CLI for code implementation.
 *
 * OpenCode is an open-source AI coding assistant that can run in headless mode.
 */
export declare class OpenCodeBackend implements CodingBackend {
    private readonly opts;
    readonly id = "opencode";
    constructor(opts?: {
        timeoutMs?: number;
    });
    implement(env: BackendEnv, input: ImplementInput): Promise<ImplementOutput>;
    private buildPrompt;
}
//# sourceMappingURL=opencode.d.ts.map