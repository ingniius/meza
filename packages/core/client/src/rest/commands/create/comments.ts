import type { MezaComment } from "../../../schemas/comment";
import type { ApplyQueryFields, Query } from "../../../types/index";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateCommentOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaComment<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createComments
 * @description Create multiple new comments.
 * @param items The comments to create
 * @param query Optional return data query
 */
export const createComments =
  <Schema, const TQuery extends Query<Schema, MezaComment<Schema>>>(
    items: Partial<MezaComment<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateCommentOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/comments`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createComment
 * @description Create a new comment.
 * @param item The comment to create
 * @param query Optional return data query
 */
export const createComment =
  <Schema, const TQuery extends Query<Schema, MezaComment<Schema>>>(
    item: Partial<MezaComment<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateCommentOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/comments`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
