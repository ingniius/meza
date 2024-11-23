import type { MezaComment } from "../../../schemas/comment";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadCommentOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaComment<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readComments
 * @description List all Comments that exist in Meza.
 * @param query The query parameters
 */
export const readComments =
  <Schema, const TQuery extends Query<Schema, MezaComment<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadCommentOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/comments`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readComment
 * @description List an existing comment by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readComment =
  <Schema, const TQuery extends Query<Schema, MezaComment<Schema>>>(
    key: MezaComment<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadCommentOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/comments/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
