import type { NextConfig } from "next";

import withBundleAnalyzer from "@next/bundle-analyzer";

const INTERNAL_PACKAGES = [
  "@azem/auth",
  "@azem/config",
  "@azem/db",
  "@azem/email",
  "@azem/locale",
  "@azem/router",
  "@azem/ui",
];

export const config: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: { formats: ["image/avif", "image/webp"], remotePatterns: [] },
  reactStrictMode: true,
  transpilePackages: INTERNAL_PACKAGES,
};

export function withAnalyzer(sourceConfig: NextConfig): NextConfig {
  return withBundleAnalyzer()(sourceConfig);
}
