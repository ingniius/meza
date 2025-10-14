import "server-only";
import { headers } from "next/headers";
import { cache } from "react";

import { initAuth } from ".";
import { keys } from "./keys";

export const auth = initAuth({
  baseUrl: process.env.VERCEL_ENV === "production"
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_ENV === "preview"
      ? `https://${process.env.VERCEL_URL}`
      : `http://${process.env.HOST}:${process.env.PORT}`,
  productionUrl: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  secret: keys().AUTH_SECRET,
});

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);
