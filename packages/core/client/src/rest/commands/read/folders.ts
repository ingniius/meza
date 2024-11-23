import type { MezaFolder } from "../../../schemas/folder";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadFolderOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaFolder<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readFolders
 * @description List all folders that exist in Meza.
 * @param query The query parameters
 */
export const readFolders =
  <Schema, const TQuery extends Query<Schema, MezaFolder<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadFolderOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/folders`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readFolder
 * @description List an existing folder by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readFolder =
  <Schema, const TQuery extends Query<Schema, MezaFolder<Schema>>>(
    key: MezaFolder<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadFolderOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/folders/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
