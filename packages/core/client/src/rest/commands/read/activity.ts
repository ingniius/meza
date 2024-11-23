import type { MezaActivity } from "../../../schemas/activity";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadActivityOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaActivity<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name aggregate
 * @description Returns a list of activity actions.
 * @param query The query parameters
 */
export const readActivities =
  <Schema, const TQuery extends Query<Schema, MezaActivity<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadActivityOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/activity`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name aggregate
 * @description Returns a single activity action by primary key.
 * @param key The primary key of the activity
 * @param query The query parameters
 */
export const readActivity =
  <Schema, const TQuery extends Query<Schema, MezaActivity<Schema>>>(
    key: MezaActivity<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadActivityOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/activity/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
