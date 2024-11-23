import baseConfig from "./base.mjs";

/** @type {import("prettier").Config} */
export default {
  ...baseConfig,
  importOrder: [
    "^@turbo|^vitest",
    "^@vue/test-utils|^happy-dom",
    "^@vitejs/(.*)$|^@vitejs|^vite",
    "^vue/^node:",
    "^@azem/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$|^~/(.*)$",
    "^[./]",
  ],
};
