import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: ["./src/action", "./src/code", "./src/index"],
  rollup: { emitCJS: true },
});
