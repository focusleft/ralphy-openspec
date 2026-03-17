import type { CodingBackend } from "./types";
export declare class NoopBackend implements CodingBackend {
    readonly id: string;
    constructor(id: string);
    implement(): Promise<{
        ok: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=noop.d.ts.map