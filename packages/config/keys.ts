import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export function keys() {
  return createEnv({
    server: {
      ANALYZE: z.string().optional(),
      NEXT_RUNTIME: z.enum(["nodejs", "edge"]).optional(),
      VERCEL: z.string().optional(),
      VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
      VERCEL_URL: z.string().optional(),
      VERCEL_REGION: z.string().optional(),
      VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
    },
    client: {
      NEXT_PUBLIC_DOMAIN: z.string().default("azem.tech"),
      NEXT_PUBLIC_NAME: z.string().default("Meza"),
      NEXT_PUBLIC_URL: z.url().default("http://azem.tech"),
      NEXT_PUBLIC_ADMIN: z.url().default("http://admin.azem.tech"),
      NEXT_PUBLIC_API: z.url().default("http://api.azem.tech"),
      NEXT_PUBLIC_APP: z.url().default("http://app.azem.tech"),
    },
    runtimeEnv: {
      ANALYZE: process.env.ANALYZE,
      NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
      NEXT_PUBLIC_NAME: process.env.NEXT_PUBLIC_NAME,
      NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
      NEXT_PUBLIC_ADMIN: process.env.NEXT_PUBLIC_ADMIN,
      NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
      NEXT_PUBLIC_APP: process.env.NEXT_PUBLIC_APP,
      NEXT_RUNTIME: process.env.NEXT_RUNTIME,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      VERCEL_REGION: process.env.VERCEL_REGION,
      VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    },
  });
}
