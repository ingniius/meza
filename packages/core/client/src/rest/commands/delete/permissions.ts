import type { MezaPermission } from "../../../schemas/permission";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deletePermissions
 * @description Delete multiple existing permissions rules.
 * @param keys
 */
export const deletePermissions =
  <Schema>(keys: MezaPermission<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/permissions`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deletePermission
 * @description Delete an existing permissions rule.
 * @param key
 */
export const deletePermission =
  <Schema>(key: MezaPermission<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/permissions/${key}`,
      method: "DELETE",
    };
  };
