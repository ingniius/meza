import type { RestCommand } from "../types";

/**
 * @publicApi
 * @name withToken
 * @param token
 * @param getOptions
 */
export function withToken<Schema, Output>(
  token: string,
  getOptions: RestCommand<Output, Schema>,
): RestCommand<Output, Schema> {
  return () => {
    const options = getOptions();

    if (token) {
      if (!options.headers) options.headers = {};
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    return options;
  };
}
