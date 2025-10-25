import type { NextConfig } from "next";

import { env } from "@/env";
import { config, withAnalyzer } from "@azem/config";

let nextConfig: NextConfig = config;

if (env.ANALYZE === "true") {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;
