import vue from "eslint-plugin-vue";
import tsc from "typescript-eslint";

import baseConfig from "./base.mjs";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  ...baseConfig,
  ...vue.configs["flat/base"],
  ...vue.configs["flat/essential"],
  ...vue.configs["flat/recommended"],
  ...vue.configs["flat/strongly-recommended"],
  {
    files: ["**/*.vue"],
    rules: {
      "import/first": "off",
      "import/order": "off",
      "vue/html-indent": "off",
      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-multiple-template-root": "off",
      "vue/no-template-shadow": "off",
      "vue/one-component-per-file": "off",
      "vue/require-default-prop": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
    languageOptions: {
      parserOptions: {
        parser: {
          js: "espree",
          jsx: "espree",
          mjs: "espree",
          ts: tsc.parser,
          tsx: tsc.parser,
          mts: tsc.parser,
        },
        extraFileExtensions: [".vue"],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
