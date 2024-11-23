import type { MezaFlow } from "../../../schemas/flow";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateFlowOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaFlow<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateFlows
 * @description Update multiple existing flows.
 * @param keys
 * @param item
 * @param query
 */
export const updateFlows =
  <Schema, const TQuery extends Query<Schema, MezaFlow<Schema>>>(
    keys: MezaFlow<Schema>["id"][],
    item: Partial<MezaFlow<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateFlowOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/flows`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateFlowsBatch
 * @description Update multiple flows as batch.
 * @param items
 * @param query
 */
export const updateFlowsBatch =
  <Schema, const TQuery extends Query<Schema, MezaFlow<Schema>>>(
    items: NestedPartial<MezaFlow<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateFlowOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/flows`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updateFlow
 * @description Update an existing flow.
 * @param key
 * @param item
 * @param query
 */
export const updateFlow =
  <Schema, const TQuery extends Query<Schema, MezaFlow<Schema>>>(
    key: MezaFlow<Schema>["id"],
    item: Partial<MezaFlow<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateFlowOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/flows/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
