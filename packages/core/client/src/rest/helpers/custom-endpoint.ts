import type { RequestOptions } from "../../index";
import type { RestCommand } from "../types";

/**
 * @publicApi
 * @name customEndpoint
 * @param options
 */
export function customEndpoint<Output = unknown>(options: RequestOptions): RestCommand<Output, never> {
  return () => options;
}
