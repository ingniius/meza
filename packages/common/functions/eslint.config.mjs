import baseConfig from "@azem/eslint/base";

/** @type {import('typescript-eslint').Config} */
export default [{ ignores: ["dist/**"] }, ...baseConfig];
