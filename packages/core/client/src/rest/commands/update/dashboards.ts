import type { MezaDashboard } from "../../../schemas/dashboard";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateDashboardOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaDashboard<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateDashboards
 * @description Update multiple existing dashboards.
 * @param keys
 * @param item
 * @param query
 */
export const updateDashboards =
  <Schema, const TQuery extends Query<Schema, MezaDashboard<Schema>>>(
    keys: MezaDashboard<Schema>["id"][],
    item: Partial<MezaDashboard<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateDashboardOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/dashboards`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateDashboardsBatch
 * @description Update multiple dashboards as batch.
 * @param items
 * @param query
 */
export const updateDashboardsBatch =
  <Schema, const TQuery extends Query<Schema, MezaDashboard<Schema>>>(
    items: NestedPartial<MezaDashboard<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateDashboardOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/dashboards`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updateDashboard
 * @description Update an existing dashboard.
 * @param key
 * @param item
 * @param query
 */
export const updateDashboard =
  <Schema, const TQuery extends Query<Schema, MezaDashboard<Schema>>>(
    key: MezaDashboard<Schema>["id"],
    item: Partial<MezaDashboard<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateDashboardOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/dashboards/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
