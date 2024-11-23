import type { MezaVersion } from "../../../schemas/version";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateContentVersionOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaVersion<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateContentVersions
 * @description Update multiple existing Content Versions.
 * @param keys
 * @param item
 * @param query
 */
export const updateContentVersions =
  <Schema, const TQuery extends Query<Schema, MezaVersion<Schema>>>(
    keys: MezaVersion<Schema>["id"][],
    item: Partial<MezaVersion<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateContentVersionOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/versions`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateContentVersionsBatch
 * @description Update multiple Content Versions as batch.
 * @param items
 * @param query
 */
export const updateContentVersionsBatch =
  <Schema, const TQuery extends Query<Schema, MezaVersion<Schema>>>(
    items: NestedPartial<MezaVersion<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateContentVersionOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/versions`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updateContentVersion
 * @description Update an existing Content Version.
 * @param key
 * @param item
 * @param query
 */
export const updateContentVersion =
  <Schema, const TQuery extends Query<Schema, MezaVersion<Schema>>>(
    key: MezaVersion<Schema>["id"],
    item: Partial<MezaVersion<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateContentVersionOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/versions/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
