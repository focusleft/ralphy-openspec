export declare function writeBackendLog(args: {
    logFile: string;
    backendId: string;
    cwd: string;
    command: string;
    argv: string[];
    startedAt: string;
    finishedAt: string;
    exitCode: number | null;
    timedOut?: boolean;
    timeoutMs?: number;
    stdout?: string;
    stderr?: string;
}): Promise<void>;
//# sourceMappingURL=log-writer.d.ts.map