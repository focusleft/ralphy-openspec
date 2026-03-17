import type { BackendEnv, CodingBackend, ImplementInput, ImplementOutput } from "./types";
/**
 * CursorBackend shells out to the `cursor` CLI for code implementation.
 *
 * Note: Cursor IDE typically runs interactively. This backend sends prompts
 * via the CLI and expects the user/AI to complete the task.
 */
export declare class CursorBackend implements CodingBackend {
    private readonly opts;
    readonly id = "cursor";
    constructor(opts?: {
        timeoutMs?: number;
    });
    implement(env: BackendEnv, input: ImplementInput): Promise<ImplementOutput>;
    private buildPrompt;
}
//# sourceMappingURL=cursor.d.ts.map