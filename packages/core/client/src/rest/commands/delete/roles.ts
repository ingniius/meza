import type { MezaRole } from "../../../schemas/role";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteRoles
 * @description Delete multiple existing roles.
 * @param keys
 */
export const deleteRoles =
  <Schema>(keys: MezaRole<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/roles`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteRole
 * @description Delete an existing role.
 * @param key
 */
export const deleteRole =
  <Schema>(key: MezaRole<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/roles/${key}`,
      method: "DELETE",
    };
  };
