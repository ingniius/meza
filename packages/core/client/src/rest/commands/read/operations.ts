import type { MezaOperation } from "../../../schemas/operation";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

export type ReadOperationOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaOperation<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readOperations
 * @description List all operations that exist in Meza.
 * @param query The query parameters
 */
export const readOperations =
  <Schema, const TQuery extends Query<Schema, MezaOperation<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadOperationOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/operations`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readOperation
 * @description List all Operations that exist in Meza.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readOperation =
  <Schema, const TQuery extends Query<Schema, MezaOperation<Schema>>>(
    key: MezaOperation<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadOperationOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/operations/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
