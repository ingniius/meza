import type { MezaOperation } from "../../../schemas/operation";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteOperations
 * @description Delete multiple existing operations.
 * @param keys
 */
export const deleteOperations =
  <Schema>(keys: MezaOperation<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/operations`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteOperation
 * @description Delete an existing operation.
 * @param key
 */
export const deleteOperation =
  <Schema>(key: MezaOperation<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/operations/${key}`,
      method: "DELETE",
    };
  };
