import type { MezaShare } from "../../../schemas/share";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadShareOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaShare<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readShares
 * @description List all Shares that exist in Meza.
 * @param query The query parameters
 */
export const readShares =
  <Schema, const TQuery extends Query<Schema, MezaShare<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadShareOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/shares`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readShare
 * @description List an existing Share by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readShare =
  <Schema, TQuery extends Query<Schema, MezaShare<Schema>>>(
    key: MezaShare<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadShareOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/shares/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
