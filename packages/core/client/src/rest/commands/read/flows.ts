import type { MezaFlow } from "../../../schemas/flow";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadFlowOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaFlow<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readFlows
 * @description List all flows that exist in Meza.
 * @param query The query parameters
 */
export const readFlows =
  <Schema, const TQuery extends Query<Schema, MezaFlow<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadFlowOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/flows`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readFlow
 * @description List an existing flow by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readFlow =
  <Schema, const TQuery extends Query<Schema, MezaFlow<Schema>>>(
    key: MezaFlow<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadFlowOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/flows/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
