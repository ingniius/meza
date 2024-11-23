import type { MezaUser } from "../../../schemas/user";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteUsers
 * @description Delete multiple existing users.
 * @param keys
 */
export const deleteUsers =
  <Schema>(keys: MezaUser<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/users`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteUser
 * @description Delete an existing user.
 * @param key
 */
export const deleteUser =
  <Schema>(key: MezaUser<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/users/${key}`,
      method: "DELETE",
    };
  };
