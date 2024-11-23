import type { RequestTransformer } from "../../index.js";
import type { RestCommand } from "../types.js";

/**
 * @publicApi
 * @name withOptions
 * @param getOptions
 * @param extraOptions
 */
export function withOptions<Schema, Output>(
  getOptions: RestCommand<Output, Schema>,
  extraOptions: RequestTransformer | Partial<RequestInit>,
): RestCommand<Output, Schema> {
  return () => {
    const options = getOptions();

    if (typeof extraOptions === "function") {
      options.onRequest = extraOptions;
    } else {
      options.onRequest = (options) => ({
        ...options,
        ...extraOptions,
      });
    }

    return options;
  };
}
