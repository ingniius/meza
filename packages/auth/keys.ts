import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export function keys() {
  return createEnv({
    server: {
      AUTH_SECRET: z.string(),
      GITHUB_CLIENT_ID: z.string(),
      GITHUB_CLIENT_SECRET: z.string(),
    },
    runtimeEnv: {
      AUTH_SECRET: process.env.AUTH_SECRET,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    },
  });
}
