import { z } from "zod";
import type { FileContract, ProjectSpec, TaskSpec } from "./types";
export declare const projectSpecSchema: z.ZodPipe<z.ZodObject<{
    version: z.ZodDefault<z.ZodString>;
    project: z.ZodDefault<z.ZodObject<{
        name: z.ZodDefault<z.ZodString>;
        repoRoot: z.ZodDefault<z.ZodString>;
        language: z.ZodOptional<z.ZodString>;
        packageManager: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    defaults: z.ZodDefault<z.ZodPipe<z.ZodObject<{
        backend: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        workspaceMode: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            worktree: "worktree";
            patch: "patch";
        }>>>;
        checkpointMode: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            patch: "patch";
            commit: "commit";
        }>>>;
        validators: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    }, z.core.$strip>, z.ZodTransform<{
        backend: string;
        workspaceMode: "worktree" | "patch";
        checkpointMode: "patch" | "commit";
        validators: string[];
    }, {
        backend?: string | undefined;
        workspaceMode?: "worktree" | "patch" | undefined;
        checkpointMode?: "patch" | "commit" | undefined;
        validators?: string[] | undefined;
    }>>>;
    policies: z.ZodOptional<z.ZodObject<{
        scopeGuard: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
            off: "off";
            warn: "warn";
            block: "block";
        }>>>;
    }, z.core.$strip>>;
    sprint_defaults: z.ZodOptional<z.ZodObject<{
        XS: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            optimal: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            warning: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            hard: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodAny;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                max_iterations: any;
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                maxIterations?: any;
            }>>>>;
        }, z.core.$strip>>>;
        S: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            optimal: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            warning: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            hard: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodAny;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                max_iterations: any;
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                maxIterations?: any;
            }>>>>;
        }, z.core.$strip>>>;
        M: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            optimal: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            warning: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            hard: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodAny;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                max_iterations: any;
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                maxIterations?: any;
            }>>>>;
        }, z.core.$strip>>>;
        L: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            optimal: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            warning: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            hard: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodAny;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                max_iterations: any;
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                maxIterations?: any;
            }>>>>;
        }, z.core.$strip>>>;
        XL: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            optimal: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            warning: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            hard: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodAny;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                max_iterations: any;
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                maxIterations?: any;
            }>>>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    sprintDefaults: z.ZodOptional<z.ZodObject<{
        XS: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            optimal: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            warning: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            hard: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodAny;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                max_iterations: any;
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                maxIterations?: any;
            }>>>>;
        }, z.core.$strip>>>;
        S: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            optimal: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            warning: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            hard: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodAny;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                max_iterations: any;
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                maxIterations?: any;
            }>>>>;
        }, z.core.$strip>>>;
        M: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            optimal: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            warning: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            hard: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodAny;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                max_iterations: any;
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                maxIterations?: any;
            }>>>>;
        }, z.core.$strip>>>;
        L: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            optimal: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            warning: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            hard: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodAny;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                max_iterations: any;
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                maxIterations?: any;
            }>>>>;
        }, z.core.$strip>>>;
        XL: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            optimal: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            warning: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            hard: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodAny;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                max_iterations: any;
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                maxIterations?: any;
            }>>>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    budgets: z.ZodPipe<z.ZodOptional<z.ZodObject<{
        run: z.ZodOptional<z.ZodObject<{
            money_usd: z.ZodOptional<z.ZodAny>;
            moneyUsd: z.ZodOptional<z.ZodAny>;
            tokens: z.ZodOptional<z.ZodAny>;
            wall_time_minutes: z.ZodOptional<z.ZodAny>;
            wallTimeMinutes: z.ZodOptional<z.ZodAny>;
            max_iterations_total: z.ZodOptional<z.ZodAny>;
            maxIterationsTotal: z.ZodOptional<z.ZodAny>;
        }, z.core.$strip>>;
        limits: z.ZodOptional<z.ZodObject<{
            max_parallel_tasks: z.ZodOptional<z.ZodAny>;
            maxParallelTasks: z.ZodOptional<z.ZodAny>;
            max_parallel_validators: z.ZodOptional<z.ZodAny>;
            maxParallelValidators: z.ZodOptional<z.ZodAny>;
            command_timeout_seconds: z.ZodOptional<z.ZodAny>;
            commandTimeoutSeconds: z.ZodOptional<z.ZodAny>;
        }, z.core.$strip>>;
    }, z.core.$strip>>, z.ZodTransform<{
        run: {
            moneyUsd: number | undefined;
            tokens: number | undefined;
            wallTimeMinutes: number | undefined;
            maxIterationsTotal: number | undefined;
        } | undefined;
        limits: {
            maxParallelTasks: number | undefined;
            maxParallelValidators: number | undefined;
            commandTimeoutSeconds: number | undefined;
        } | undefined;
    } | undefined, {
        run?: {
            money_usd?: any;
            moneyUsd?: any;
            tokens?: any;
            wall_time_minutes?: any;
            wallTimeMinutes?: any;
            max_iterations_total?: any;
            maxIterationsTotal?: any;
        } | undefined;
        limits?: {
            max_parallel_tasks?: any;
            maxParallelTasks?: any;
            max_parallel_validators?: any;
            maxParallelValidators?: any;
            command_timeout_seconds?: any;
            commandTimeoutSeconds?: any;
        } | undefined;
    } | undefined>>;
    backends: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        command: z.ZodString;
        modelTiers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, z.core.$strip>>>;
    validators: z.ZodOptional<z.ZodArray<z.ZodPipe<z.ZodObject<{
        id: z.ZodString;
        run: z.ZodString;
        timeout_seconds: z.ZodOptional<z.ZodAny>;
        timeoutSeconds: z.ZodOptional<z.ZodAny>;
        parser: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodTransform<{
        id: string;
        run: string;
        timeoutSeconds: number | undefined;
        parser: string | undefined;
    }, {
        id: string;
        run: string;
        timeout_seconds?: any;
        timeoutSeconds?: any;
        parser?: string | undefined;
    }>>>>;
    tasks: z.ZodDefault<z.ZodArray<z.ZodPipe<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        goal: z.ZodOptional<z.ZodString>;
        deps: z.ZodOptional<z.ZodArray<z.ZodString>>;
        priority: z.ZodOptional<z.ZodNumber>;
        validators: z.ZodOptional<z.ZodArray<z.ZodString>>;
        files_contract: z.ZodOptional<z.ZodPipe<z.ZodObject<{
            allowed: z.ZodDefault<z.ZodArray<z.ZodString>>;
            forbidden: z.ZodDefault<z.ZodArray<z.ZodString>>;
            allow_new_files: z.ZodOptional<z.ZodBoolean>;
            allowNewFiles: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>, z.ZodTransform<FileContract, {
            allowed: string[];
            forbidden: string[];
            allow_new_files?: boolean | undefined;
            allowNewFiles?: boolean | undefined;
        }>>>;
        filesContract: z.ZodOptional<z.ZodPipe<z.ZodObject<{
            allowed: z.ZodDefault<z.ZodArray<z.ZodString>>;
            forbidden: z.ZodDefault<z.ZodArray<z.ZodString>>;
            allow_new_files: z.ZodOptional<z.ZodBoolean>;
            allowNewFiles: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>, z.ZodTransform<FileContract, {
            allowed: string[];
            forbidden: string[];
            allow_new_files?: boolean | undefined;
            allowNewFiles?: boolean | undefined;
        }>>>;
        budget: z.ZodOptional<z.ZodObject<{
            optimal: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            warning: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodOptional<z.ZodAny>;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                max_iterations?: any;
                maxIterations?: any;
            }>>>>;
            hard: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodObject<{
                usd: z.ZodOptional<z.ZodAny>;
                tokens: z.ZodOptional<z.ZodAny>;
                time_minutes: z.ZodOptional<z.ZodAny>;
                timeMinutes: z.ZodOptional<z.ZodAny>;
                max_iterations: z.ZodAny;
                maxIterations: z.ZodOptional<z.ZodAny>;
            }, z.core.$strip>, z.ZodTransform<{
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            }, {
                max_iterations: any;
                usd?: any;
                tokens?: any;
                time_minutes?: any;
                timeMinutes?: any;
                maxIterations?: any;
            }>>>>;
        }, z.core.$strip>>;
        sprint: z.ZodOptional<z.ZodObject<{
            size: z.ZodOptional<z.ZodEnum<{
                XS: "XS";
                S: "S";
                M: "M";
                L: "L";
                XL: "XL";
            }>>;
            intent: z.ZodOptional<z.ZodEnum<{
                fix: "fix";
                feature: "feature";
                refactor: "refactor";
                infra: "infra";
            }>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodTransform<TaskSpec, {
        id: string;
        title?: string | undefined;
        goal?: string | undefined;
        deps?: string[] | undefined;
        priority?: number | undefined;
        validators?: string[] | undefined;
        files_contract?: FileContract | undefined;
        filesContract?: FileContract | undefined;
        budget?: {
            optimal?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            warning?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            hard?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
        } | undefined;
        sprint?: {
            size?: "XS" | "S" | "M" | "L" | "XL" | undefined;
            intent?: "fix" | "feature" | "refactor" | "infra" | undefined;
        } | undefined;
    }>>>>;
    artifacts: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        rootDir: z.ZodOptional<z.ZodString>;
        statusIcons: z.ZodOptional<z.ZodEnum<{
            ascii: "ascii";
            emoji: "emoji";
            none: "none";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodTransform<ProjectSpec, {
    version: string;
    project: {
        name: string;
        repoRoot: string;
        language?: string | undefined;
        packageManager?: string | undefined;
    };
    defaults: {
        backend: string;
        workspaceMode: "worktree" | "patch";
        checkpointMode: "patch" | "commit";
        validators: string[];
    };
    budgets: {
        run: {
            moneyUsd: number | undefined;
            tokens: number | undefined;
            wallTimeMinutes: number | undefined;
            maxIterationsTotal: number | undefined;
        } | undefined;
        limits: {
            maxParallelTasks: number | undefined;
            maxParallelValidators: number | undefined;
            commandTimeoutSeconds: number | undefined;
        } | undefined;
    } | undefined;
    tasks: TaskSpec[];
    policies?: {
        scopeGuard?: "off" | "warn" | "block" | undefined;
    } | undefined;
    sprint_defaults?: {
        XS?: {
            optimal?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            warning?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            hard?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
        } | undefined;
        S?: {
            optimal?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            warning?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            hard?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
        } | undefined;
        M?: {
            optimal?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            warning?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            hard?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
        } | undefined;
        L?: {
            optimal?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            warning?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            hard?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
        } | undefined;
        XL?: {
            optimal?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            warning?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            hard?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    sprintDefaults?: {
        XS?: {
            optimal?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            warning?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            hard?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
        } | undefined;
        S?: {
            optimal?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            warning?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            hard?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
        } | undefined;
        M?: {
            optimal?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            warning?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            hard?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
        } | undefined;
        L?: {
            optimal?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            warning?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            hard?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
        } | undefined;
        XL?: {
            optimal?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            warning?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
            hard?: {
                usd: number | undefined;
                tokens: number | undefined;
                timeMinutes: number | undefined;
                maxIterations: number | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    backends?: Record<string, {
        command: string;
        modelTiers?: Record<string, Record<string, unknown>> | undefined;
    }> | undefined;
    validators?: {
        id: string;
        run: string;
        timeoutSeconds: number | undefined;
        parser: string | undefined;
    }[] | undefined;
    artifacts?: {
        enabled?: boolean | undefined;
        rootDir?: string | undefined;
        statusIcons?: "ascii" | "emoji" | "none" | undefined;
    } | undefined;
}>>;
//# sourceMappingURL=schemas.d.ts.map