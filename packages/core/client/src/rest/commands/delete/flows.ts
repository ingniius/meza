import type { MezaFlow } from "../../../schemas/flow";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteFlows
 * @description Delete multiple existing flows.
 * @param keys
 */
export const deleteFlows =
  <Schema>(keys: MezaFlow<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/flows`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteFlow
 * @description Delete an existing flow.
 * @param key
 */
export const deleteFlow =
  <Schema>(key: MezaFlow<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/flows/${key}`,
      method: "DELETE",
    };
  };
