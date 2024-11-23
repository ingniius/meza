import type { MezaDashboard } from "../../../schemas/dashboard";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateDashboardOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaDashboard<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createDashboards
 * @description Create multiple new dashboards.
 * @param items The items to create
 * @param query Optional return data query
 */
export const createDashboards =
  <Schema, const TQuery extends Query<Schema, MezaDashboard<Schema>>>(
    items: Partial<MezaDashboard<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateDashboardOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/dashboards`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createDashboard
 * @description Create a new dashboard.
 * @param item The dashboard to create
 * @param query Optional return data query
 */
export const createDashboard =
  <Schema, const TQuery extends Query<Schema, MezaDashboard<Schema>>>(
    item: Partial<MezaDashboard<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateDashboardOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/dashboards`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
