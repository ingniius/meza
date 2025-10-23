import antfu from "@antfu/eslint-config";
import turbo from "eslint-config-turbo/flat";

import { config } from "./base.mjs";

/** @type {Awaited<import("@antfu/eslint-config").TypedFlatConfigItem[]>} */
export default (options) => antfu({ ...config, react: true }, ...turbo, ...options);
