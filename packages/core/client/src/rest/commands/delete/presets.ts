import type { MezaPreset } from "../../../schemas/preset";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils/";

/**
 * @publicApi
 * @name deletePresets
 * @description Delete multiple existing presets.
 * @param keys
 */
export const deletePresets =
  <Schema>(keys: MezaPreset<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/presets`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deletePreset
 * @description Delete an existing preset.
 * @param key
 */
export const deletePreset =
  <Schema>(key: MezaPreset<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/presets/${key}`,
      method: "DELETE",
    };
  };
