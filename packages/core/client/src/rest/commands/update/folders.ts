import type { MezaFolder } from "../../../schemas/folder";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateFolderOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaFolder<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateFolders
 * @description Update multiple existing folders.
 * @param keys
 * @param item
 * @param query
 */
export const updateFolders =
  <Schema, const TQuery extends Query<Schema, MezaFolder<Schema>>>(
    keys: MezaFolder<Schema>["id"][],
    item: Partial<MezaFolder<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateFolderOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/folders`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateFoldersBatch
 * @description Update multiple folders as batch.
 * @param items
 * @param query
 */
export const updateFoldersBatch =
  <Schema, const TQuery extends Query<Schema, MezaFolder<Schema>>>(
    items: NestedPartial<MezaFolder<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateFolderOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/folders`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updateFolder
 * @description Update an existing folder.
 * @param key
 * @param item
 * @param query
 */
export const updateFolder =
  <Schema, const TQuery extends Query<Schema, MezaFolder<Schema>>>(
    key: MezaFolder<Schema>["id"],
    item: Partial<MezaFolder<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateFolderOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/folders/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
