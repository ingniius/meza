import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: ["./src/assertion", "./src/object", "./src/string", "./src/index"],
  rollup: { emitCJS: true },
});
