import type { MezaFlow } from "../../../schemas/flow";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateFlowOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaFlow<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createFlows
 * @description Create multiple new flows.
 * @param items The flows to create
 * @param query Optional return data query
 */
export const createFlows =
  <Schema, const TQuery extends Query<Schema, MezaFlow<Schema>>>(
    items: Partial<MezaFlow<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateFlowOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/flows`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createFlow
 * @description Create a new flow.
 * @param item The flow to create
 * @param query Optional return data query
 */
export const createFlow =
  <Schema, TQuery extends Query<Schema, MezaFlow<Schema>>>(
    item: Partial<MezaFlow<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateFlowOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/flows`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
