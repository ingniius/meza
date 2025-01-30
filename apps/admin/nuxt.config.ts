export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  srcDir: "./app",
  modules: ["@nuxt/eslint", "@azem/engine", "@azem/ui"],
  compatibilityDate: "2024-08-19",
  future: {
    compatibilityVersion: 4,
  },
});
