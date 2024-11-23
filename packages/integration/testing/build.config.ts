import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: [
    "./src/alpha",
    "./src/array",
    "./src/identifier",
    "./src/integer",
    "./src/sequence",
    "./src/uuid",
    "./src/index",
  ],
  rollup: { emitCJS: true },
});
