import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { oAuthProxy } from "better-auth/plugins";

import { prisma } from "@azem/db";

import { keys } from "./keys";

interface Options {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;
}

export function initAuth(options: Options): Auth {
  return betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    baseURL: options.baseUrl,
    secret: options.secret,
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      oAuthProxy({ currentURL: options.baseUrl, productionURL: options.productionUrl }),
    ],
    session: {
      cookieCache: { enabled: true, maxAge: process.env.NODE_ENV !== "production" ? 60 : 5 * 60 },
    },
    socialProviders: {
      github: {
        clientId: keys().GITHUB_CLIENT_ID,
        clientSecret: keys().GITHUB_CLIENT_SECRET,
      },
    },
    onAPIError: {
      onError(error, ctx) {
        console.error("BETTER AUTH API ERROR", error, ctx);
      },
    },
  });
}

export type Auth = ReturnType<typeof betterAuth>;

export type Session = Auth["$Infer"]["Session"];
