import type { MezaDashboard } from "../../../schemas/dashboard";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadDashboardOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaDashboard<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readDashboards
 * @description List all dashboards that exist in Meza.
 * @param query The query parameters
 */
export const readDashboards =
  <Schema, const TQuery extends Query<Schema, MezaDashboard<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadDashboardOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/dashboards`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readDashboard
 * @description List an existing dashboard by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readDashboard =
  <Schema, const TQuery extends Query<Schema, MezaDashboard<Schema>>>(
    key: MezaDashboard<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadDashboardOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/dashboards/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
