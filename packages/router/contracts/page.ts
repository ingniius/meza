import type { TRPCRouterRecord } from "@trpc/server";

import { z } from "zod/v4";

import * as dto from "@azem/db/generated/schemas";

import { protectedProcedure, publicProcedure } from "../trpc";

export const pageRouter = {
  findMany: publicProcedure.query(({ ctx }) => {
    return ctx.db.page.findMany({ orderBy: { id: "desc" }, take: 10 });
  }),
  findUnique: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.page.findUnique({ where: { id: input.id } });
  }),
  create: protectedProcedure.input(dto.PageInputSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.page.create({ data: input });
  }),
  delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.page.delete({ where: { id: input } });
  }),
} satisfies TRPCRouterRecord;
