import { defineConfig } from "vitest/config";

import dts from "vite-plugin-dts";

import { globbySync } from "globby";

import { dependencies, peerDependencies } from "./package.json";

export default defineConfig(({ mode }) => ({
  build: {
    emptyOutDir: true,
    minify: mode === "production",
    sourcemap: true,
    lib: {
      entry: globbySync(["src/**/*.ts", "!src/**/*.spec.ts"]),
      fileName: (ext, name) => `${name}.${ext === "es" ? "mjs" : ext}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [...Object.keys(dependencies), ...Object.keys(peerDependencies), ...["node:fs", "node:path"]].map(
        (pkg) => new RegExp(`^${pkg}(/.*)?`),
      ),
      output: {
        exports: "named",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
  plugins: [dts({ exclude: ["src/**/*.spec.ts"] })],
  test: { globals: true },
}));
