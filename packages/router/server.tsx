/* eslint-disable react-refresh/only-export-components */
import type { TRPCQueryOptions } from "@trpc/tanstack-react-query";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "@azem/auth/server";

import type { AppRouter } from "./app";

import { appRouter, createTRPCContext } from ".";
import { createQueryClient } from "./query";

export const getQueryClient = cache(createQueryClient);

export const trpc = createTRPCOptionsProxy<AppRouter>({
  ctx: cache(async () => {
    const heads = new Headers(await headers());
    heads.set("x-trpc-source", "rsc");
    return createTRPCContext({ headers: heads, auth });
  }),
  router: appRouter,
  queryClient: getQueryClient,
});

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(queryOptions: T) {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}
