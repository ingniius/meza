import type { MezaShare } from "../../../schemas/share";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteTranslations
 * @description Delete multiple existing shares.
 * @param keys
 */
export const deleteShares =
  <Schema>(keys: MezaShare<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/shares`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteTranslations
 * @description Delete an existing share.
 * @param key
 */
export const deleteShare =
  <Schema>(key: MezaShare<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/shares/${key}`,
      method: "DELETE",
    };
  };
