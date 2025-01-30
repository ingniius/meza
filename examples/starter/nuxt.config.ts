export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  extends: ["@azem/admin", "@azem/api"],
  srcDir: "./app",
  modules: ["@nuxt/eslint"],
  compatibilityDate: "2024-08-19",
  future: {
    compatibilityVersion: 4,
  },
});
