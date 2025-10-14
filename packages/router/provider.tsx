"use client";

import type { QueryClient } from "@tanstack/react-query";

import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchStreamLink, loggerLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { isBrowser } from "es-toolkit";
import { useState } from "react";
import SuperJSON from "superjson";

import type { AppRouter } from "./app";

import { createQueryClient } from "./query";

let clientQueryClientSingleton: QueryClient | undefined;

// eslint-disable-next-line react-refresh/only-export-components
export const { useTRPC, TRPCProvider: TRPC } = createTRPCContext<AppRouter>();

export function TRPCProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: op =>
            process.env.NODE_ENV === "development"
            || (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPC trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPC>
    </QueryClientProvider>
  );
}

function getQueryClient() {
  if (!isBrowser()) {
    return createQueryClient();
  } else {
    return (clientQueryClientSingleton ??= createQueryClient());
  }
}

function getBaseUrl() {
  if (isBrowser())
    return window.location.origin;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`;

  return `http://${process.env.HOST}:${process.env.PORT}`;
}
