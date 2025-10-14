import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "./app";

import { appRouter } from "./app";
import { createTRPCContext } from "./trpc";

type RouterInputs = inferRouterInputs<AppRouter>;

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type { AppRouter, RouterInputs, RouterOutputs };

export { appRouter, createTRPCContext };
