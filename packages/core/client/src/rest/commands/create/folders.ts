import type { MezaFolder } from "../../../schemas/folder";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateFolderOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaFolder<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createFolders
 * @description Create multiple new (virtual) folders.
 * @param item The folder to create
 * @param query Optional return data query
 */
export const createFolders =
  <Schema, const TQuery extends Query<Schema, MezaFolder<Schema>>>(
    items: Partial<MezaFolder<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateFolderOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/folders`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createFolder
 * @description Create a new (virtual) folder.
 * @param item The folder to create
 * @param query Optional return data query
 */
export const createFolder =
  <Schema, const TQuery extends Query<Schema, MezaFolder<Schema>>>(
    item: Partial<MezaFolder<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateFolderOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/folders`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
