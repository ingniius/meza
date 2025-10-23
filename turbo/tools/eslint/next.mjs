import antfu from "@antfu/eslint-config";
import next from "@next/eslint-plugin-next";
import turbo from "eslint-config-turbo/flat";

import { config } from "./base.mjs";

/** @type {Awaited<import("@antfu/eslint-config").TypedFlatConfigItem[]>} */
export default (options) =>
  antfu(
    { ...config, react: true },
    {
      plugins: {
        "@next/next": next,
      },
      rules: {
        ...next.configs.recommended.rules,
        ...next.configs["core-web-vitals"].rules,
        "import/no-mutable-exports": "off",
      },
    },
    ...turbo,
    ...options
  );
