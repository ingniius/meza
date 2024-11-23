import type { MezaTranslation } from "../../../schemas/translation";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteTranslations
 * @description Delete multiple existing translations.
 * @param keys
 */
export const deleteTranslations =
  <Schema>(keys: MezaTranslation<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/translations`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteTranslation
 * @description Delete an existing translation.
 * @param key
 */
export const deleteTranslation =
  <Schema>(key: MezaTranslation<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/translations/${key}`,
      method: "DELETE",
    };
  };
