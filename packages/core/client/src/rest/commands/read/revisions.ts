import type { MezaRevision } from "../../../schemas/revision";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadRevisionOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaRevision<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readRevisions
 * @description List all Revisions that exist in Meza.
 * @param query The query parameters
 */
export const readRevisions =
  <Schema, const TQuery extends Query<Schema, MezaRevision<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadRevisionOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/revisions`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readRevision
 * @description List an existing Revision by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readRevision =
  <Schema, const TQuery extends Query<Schema, MezaRevision<Schema>>>(
    key: MezaRevision<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadRevisionOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/revisions/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
