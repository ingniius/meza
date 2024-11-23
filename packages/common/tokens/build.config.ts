import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: [
    "./src/field",
    "./src/file",
    "./src/injection",
    "./src/number",
    "./src/permission",
    "./src/regex",
    "./src/index",
  ],
  rollup: { emitCJS: true },
});
