export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  modules: ["@nuxt/eslint", "@azem/engine"],
  compatibilityDate: "2024-08-19",
  future: {
    compatibilityVersion: 4,
  },
});
