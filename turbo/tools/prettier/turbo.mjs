import baseConfig from "./base.mjs";

/** @type {import("prettier").Config} */
export default {
  ...baseConfig,
  overrides: [
    { files: "*.json.hbs", options: { parser: "json" } },
    { files: "*.mjs.hbs", options: { parser: "babel" } },
    { files: "*.ts.hbs", options: { parser: "typescript" } },
  ],
};
