import type { MezaVersion } from "../../../schemas/version";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadContentVersionOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaVersion<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readContentVersions
 * @description List all Content Versions that exist in Meza.
 * @param query The query parameters
 */
export const readContentVersions =
  <Schema, const TQuery extends Query<Schema, MezaVersion<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadContentVersionOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/versions`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readContentVersion
 * @description List an existing COntent Version by primary key.
 * @param key The primary key of the Content Version
 * @param query The query parameters
 */
export const readContentVersion =
  <Schema, const TQuery extends Query<Schema, MezaVersion<Schema>>>(
    key: MezaVersion<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadContentVersionOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/versions/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
