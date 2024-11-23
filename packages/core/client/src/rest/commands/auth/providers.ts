import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export interface ReadProviderOutput {
  name: string;
  driver: string;
  icon?: string | null;
}

/**
 * @publicApi
 * @name readProviders
 * @description List all the configured auth providers.
 */
export const readProviders =
  <Schema>(sessionOnly = false): RestCommand<ReadProviderOutput[], Schema> =>
  () => ({
    path: sessionOnly ? "/auth?sessionOnly" : "/auth",
    method: "GET",
  });
