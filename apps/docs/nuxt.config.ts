export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  // srcDir: "./app",
  modules: ["@nuxt/eslint", "@nuxt/test-utils/module", "@nuxtjs/i18n", "@pinia/nuxt"],
  compatibilityDate: "2024-08-19",
  future: {
    compatibilityVersion: 4,
  },
});
