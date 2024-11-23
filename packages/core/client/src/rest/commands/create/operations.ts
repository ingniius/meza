import type { MezaOperation } from "../../../schemas/operation";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateOperationOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaOperation<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createOperations
 * @description Create multiple new operations.
 * @param items The operation to create
 * @param query Optional return data query
 */
export const createOperations =
  <Schema, const TQuery extends Query<Schema, MezaOperation<Schema>>>(
    items: Partial<MezaOperation<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateOperationOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/operations`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createOperation
 * @description Create a new operation.
 * @param item The operation to create
 * @param query Optional return data query
 */
export const createOperation =
  <Schema, const TQuery extends Query<Schema, MezaOperation<Schema>>>(
    item: Partial<MezaOperation<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateOperationOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/operations`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
