import type { MezaShare } from "../../../schemas/share";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateShareOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaShare<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createShares
 * @description Create multiple new shares.
 * @param items The shares to create
 * @param query Optional return data query
 */
export const createShares =
  <Schema, const TQuery extends Query<Schema, MezaShare<Schema>>>(
    items: Partial<MezaShare<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateShareOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/shares`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createShare
 * @description Create a new share.
 * @param item The share to create
 * @param query Optional return data query
 */
export const createShare =
  <Schema, const TQuery extends Query<Schema, MezaShare<Schema>>>(
    item: Partial<MezaShare<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateShareOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/shares`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
