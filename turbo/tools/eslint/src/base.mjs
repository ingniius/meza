import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import turbo from "eslint-plugin-turbo";
import tsc from "typescript-eslint";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default tsc.config(
  {
    ignores: ["**/*.config.*", "**/dist/"],
    ...prettier,
  },
  ...js.configs.recommended,
  ...tsc.configs.recommended,
  {
    files: ["**/*.mjs", "**/*.ts", "**/*.vue"],
    plugins: { turbo },
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
);
