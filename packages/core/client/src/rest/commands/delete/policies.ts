import type { MezaPolicy } from "../../../schemas/policy";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deletePolicies
 * @description Delete multiple existing policies.
 * @param keys
 */
export const deletePolicies =
  <Schema>(keys: MezaPolicy<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/policies`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deletePolicy
 * @description Delete an existing policy.
 * @param key
 */
export const deletePolicy =
  <Schema>(key: MezaPolicy<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/policies/${key}`,
      method: "DELETE",
    };
  };
