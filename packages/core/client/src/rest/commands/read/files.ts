import type { MezaFile } from "../../../schemas/file";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadFileOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaFile<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readFiles
 * @description List all files that exist in Meza.
 * @param query The query parameters
 */
export const readFiles =
  <Schema, const TQuery extends Query<Schema, MezaFile<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadFileOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/files`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readFile
 * @description Retrieve a single file by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readFile =
  <Schema, const TQuery extends Query<Schema, MezaFile<Schema>>>(
    key: MezaFile<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadFileOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/files/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
