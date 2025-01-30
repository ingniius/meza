import baseConfig from "./base.mjs";

/** @type {import("prettier").Config} */
export default {
  ...baseConfig,
  importOrder: [
    "^@turbo|^vitest",
    "^@vue/test-utils|^@vitejs|^vite",
    "^vue|^node:",
    "^@nuxt|@nuxtjs|^nuxt",
    "^#app|^#build|^#core|^#imports",
    "^#components|^#ui|^#vue-router",
    "^@azem/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$|^~/(.*)$",
    "^[./]",
  ],
  plugins: [...baseConfig.plugins, "prettier-plugin-tailwindcss"],
};
