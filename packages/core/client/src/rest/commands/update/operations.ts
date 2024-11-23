import type { MezaOperation } from "../../../schemas/operation";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateOperationOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaOperation<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateOperations
 * @description Update multiple existing operations.
 * @param keys
 * @param item
 * @param query
 */
export const updateOperations =
  <Schema, const TQuery extends Query<Schema, MezaOperation<Schema>>>(
    keys: MezaOperation<Schema>["id"][],
    item: Partial<MezaOperation<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateOperationOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/operations`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateOperationsBatch
 * @description Update multiple operations as batch.
 * @param items
 * @param query
 */
export const updateOperationsBatch =
  <Schema, const TQuery extends Query<Schema, MezaOperation<Schema>>>(
    items: NestedPartial<MezaOperation<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateOperationOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/operations`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updateOperation
 * @description Update an existing operation.
 * @param key
 * @param item
 */
export const updateOperation =
  <Schema, const TQuery extends Query<Schema, MezaOperation<Schema>>>(
    key: MezaOperation<Schema>["id"],
    item: Partial<MezaOperation<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateOperationOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/operations/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
