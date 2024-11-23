import type { MezaFolder } from "../../../schemas/folder";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteFolders
 * @description Delete multiple existing folders.
 * @param keys
 */
export const deleteFolders =
  <Schema>(keys: MezaFolder<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/folders`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteFolder
 * @description Delete an existing folder.
 * @param key
 */
export const deleteFolder =
  <Schema>(key: MezaFolder<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/folders/${key}`,
      method: "DELETE",
    };
  };
