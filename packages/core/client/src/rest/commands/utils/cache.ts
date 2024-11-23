import type { RestCommand } from "../../types";

/**
 * @publicApi
 * @name utilsExport
 * @description Resets both the data and schema cache of Meza. This endpoint is only available to admin users.
 */
export const clearCache =
  <Schema>(): RestCommand<void, Schema> =>
  () => ({
    method: "POST",
    path: `/utils/cache/clear`,
  });
