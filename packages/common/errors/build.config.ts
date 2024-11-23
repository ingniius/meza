import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: [
    { input: "./src/exceptions", builder: "mkdist", outDir: "dist/exceptions" },
    "./src/create-error",
    "./src/is-error",
    "./src/types",
    "./src/index",
  ],
  externals: ["ms"],
  rollup: { emitCJS: true },
});
