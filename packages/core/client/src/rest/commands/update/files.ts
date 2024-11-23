import type { MezaFile } from "../../../schemas/file";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateFileOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaFile<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateFiles
 * @description Update multiple files at the same time.
 * @param keys
 * @param item
 * @param query
 */
export const updateFiles =
  <Schema, const TQuery extends Query<Schema, MezaFile<Schema>>>(
    keys: MezaFile<Schema>["id"][],
    item: Partial<MezaFile<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateFileOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/files`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateFilesBatch
 * @description Update multiple files as batch.
 * @param items
 * @param query
 */
export const updateFilesBatch =
  <Schema, const TQuery extends Query<Schema, MezaFile<Schema>>>(
    items: NestedPartial<MezaFile<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateFileOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/files`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updateFile
 * @description Update an existing file, and/or replace it's file contents.
 * @param key
 * @param item
 * @param query
 */
export const updateFile =
  <Schema, const TQuery extends Query<Schema, MezaFile<Schema>>>(
    key: MezaFile<Schema>["id"],
    item: Partial<MezaFile<Schema>> | FormData,
    query?: TQuery,
  ): RestCommand<UpdateFileOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    if (item instanceof FormData) {
      return {
        path: `/files/${key}`,
        params: query ?? {},
        body: item,
        method: "PATCH",
        headers: { "Content-Type": "multipart/form-data" },
      };
    }

    return {
      path: `/files/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
