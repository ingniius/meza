import { authRouter } from "./contracts/auth";
import { pageRouter } from "./contracts/page";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  page: pageRouter,
});

export type AppRouter = typeof appRouter;
