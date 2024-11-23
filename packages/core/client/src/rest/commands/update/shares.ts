import type { MezaShare } from "../../../schemas/share";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateShareOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaShare<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateShares
 * @description Update multiple existing shares.
 * @param keys
 * @param item
 * @param query
 */
export const updateShares =
  <Schema, const TQuery extends Query<Schema, MezaShare<Schema>>>(
    keys: MezaShare<Schema>["id"][],
    item: Partial<MezaShare<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateShareOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/shares`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateSharesBatch
 * @description Update multiple shares as batch.
 * @param items
 * @param query
 */
export const updateSharesBatch =
  <Schema, const TQuery extends Query<Schema, MezaShare<Schema>>>(
    items: NestedPartial<MezaShare<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateShareOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/shares`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updateShare
 * @description Update an existing share.
 * @param key
 * @param item
 * @param query
 */
export const updateShare =
  <Schema, const TQuery extends Query<Schema, MezaShare<Schema>>>(
    key: MezaShare<Schema>["id"],
    item: Partial<MezaShare<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateShareOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/shares/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
