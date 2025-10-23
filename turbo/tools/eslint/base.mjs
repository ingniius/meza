import antfu from "@antfu/eslint-config";
import turbo from "eslint-config-turbo/flat";
import tailwindcss from "eslint-plugin-better-tailwindcss";

export const config = {
  formatters: { css: true, html: true, markdown: true },
  stylistic: { indent: 2, semi: true, quotes: "double" },
  typescript: true,
  yaml: true,
  plugins: {
    "better-tailwindcss": tailwindcss,
  },
  rules: {
    ...tailwindcss.configs["recommended-warn"].rules,
    ...tailwindcss.configs["recommended-error"].rules,
    "better-tailwindcss/enforce-consistent-line-wrapping": "off",
    "node/prefer-global/process": "off",
    "perfectionist/sort-imports": ["error", { tsconfigRootDir: "." }],
    "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "ts/explicit-function-return-type": "off",
  },
};

/** @type {Awaited<import("@antfu/eslint-config").TypedFlatConfigItem[]>} */
export default (options) => antfu(config, ...turbo, ...options);
