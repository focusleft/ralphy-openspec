import type { FileContract } from "./types";
export type ContractViolation = {
    file: string;
    reason: "forbidden" | "not_allowed" | "new_file_disallowed";
};
export declare function evaluateFileContract(args: {
    changedFiles: Array<{
        file: string;
        isNew: boolean;
    }>;
    contract: FileContract;
}): ContractViolation[];
//# sourceMappingURL=file-contract.d.ts.map