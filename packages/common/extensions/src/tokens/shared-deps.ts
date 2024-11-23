/**
 * @publicApi
 * @name API_SHARED_DEPS
 * @description Dependencies that we guarantee are available in the global scope of the app's bundle when app
 * extensions are used. These are virtually rewritten to use the existing bundled instances in the
 * global scope rather than local copies
 */
export const APP_SHARED_DEPS = ["@azem/sdk", "pinia", "vue", "vue-i18n", "vue-router"];

/**
 * @publicApi
 * @name API_SHARED_DEPS
 * @description Dependencies that we guarantee are available in the node_modules of the API when API extensions
 * are used. The `meza:*` extensions are virtual entrypoints available in the sandbox
 */
export const API_SHARED_DEPS = ["meza", "meza:api"];
