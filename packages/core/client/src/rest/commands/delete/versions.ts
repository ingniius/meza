import type { MezaVersion } from "../../../schemas/version";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteContentVersions
 * @description Delete multiple existing Content Versions.
 * @param keys
 */
export const deleteContentVersions =
  <Schema>(keys: MezaVersion<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/versions`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteContentVersion
 * @description Delete an existing Content Version.
 * @param key
 */
export const deleteContentVersion =
  <Schema>(key: MezaVersion<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/versions/${key}`,
      method: "DELETE",
    };
  };
