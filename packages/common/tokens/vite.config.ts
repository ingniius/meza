import { defineConfig } from "vitest/config";

import dts from "vite-plugin-dts";

import { globbySync } from "globby";

export default defineConfig(({ mode }) => ({
  build: {
    emptyOutDir: true,
    minify: mode === "production",
    sourcemap: true,
    lib: {
      entry: globbySync(["src/**/*.ts"]),
      fileName: (ext, name) => `${name}.${ext === "es" ? "mjs" : ext}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
  plugins: [dts()],
  test: { globals: true },
}));
