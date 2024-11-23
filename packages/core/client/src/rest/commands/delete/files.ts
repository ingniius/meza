import type { MezaFile } from "../../../schemas/file";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteFiles
 * @description Delete multiple files at once.
 */
export const deleteFiles =
  <Schema>(keys: MezaFile<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/files`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteFile
 * @description Delete an existing file.
 * @param key
 */
export const deleteFile =
  <Schema>(key: MezaFile<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/files/${key}`,
      method: "DELETE",
    };
  };
