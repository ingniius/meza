import type { MezaDashboard } from "../../../schemas/dashboard";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteDashboards
 * @description Delete multiple existing dashboards.
 * @param keysOrQuery
 */
export const deleteDashboards =
  <Schema>(keys: MezaDashboard<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/dashboards`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteDashboard
 * @description Delete an existing dashboard.
 * @param key
 */
export const deleteDashboard =
  <Schema>(key: MezaDashboard<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/dashboards/${key}`,
      method: "DELETE",
    };
  };
