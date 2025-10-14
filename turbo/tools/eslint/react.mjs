import antfu from "@antfu/eslint-config";
import turbo from "eslint-config-turbo/flat";

import { config } from "./base.mjs";

/** @type {Awaited<import("@antfu/eslint-config").TypedFlatConfigItem[]>} */
export default (options) =>
  antfu(
    { ...config, react: true },
    {
      rules: {
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-wrap-multilines": "off",
        "react/jsx-newline": "off",
      },
    },
    ...turbo,
    ...options
  );
