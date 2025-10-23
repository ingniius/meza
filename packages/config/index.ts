import type { NextConfig } from "next";

import withBundleAnalyzer from "@next/bundle-analyzer";

import { keys } from "./keys";
import { INTERNAL_PACKAGES } from "./lib/constants";
import { withLocalAliases } from "./lib/utils";

export const config: NextConfig = {
  allowedDevOrigins: process.env.NODE_ENV !== "production" || keys().VERCEL_ENV !== "production"
    ? withLocalAliases([
        keys().NEXT_PUBLIC_DOMAIN,
        `*.${keys().NEXT_PUBLIC_DOMAIN}`,
        "localhost",
        "localhost:3000",
      ])
    : undefined,
  images: { formats: ["image/avif", "image/webp"], remotePatterns: [] },
  reactStrictMode: true,
  transpilePackages: INTERNAL_PACKAGES,
};

export function withAnalyzer(sourceConfig: NextConfig): NextConfig {
  return withBundleAnalyzer()(sourceConfig);
}
