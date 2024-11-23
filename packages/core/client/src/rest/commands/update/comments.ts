import type { MezaComment } from "../../../schemas/comment";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateCommentOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaComment<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateComments
 * @description Update multiple existing comments.
 * @param keysOrQuery The primary keys or a query
 * @param item
 * @param query
 */
export const updateComments =
  <Schema, const TQuery extends Query<Schema, MezaComment<Schema>>>(
    keysOrQuery: MezaComment<Schema>["id"][] | Query<Schema, MezaComment<Schema>>,
    item: Partial<MezaComment<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateCommentOutput<Schema, TQuery>[], Schema> =>
  () => {
    let payload: Record<string, any> = {};

    if (Array.isArray(keysOrQuery)) {
      throwIfEmpty(keysOrQuery, "keysOrQuery cannot be empty");
      payload = { keys: keysOrQuery };
    } else {
      throwIfEmpty(Object.keys(keysOrQuery), "keysOrQuery cannot be empty");
      payload = { query: keysOrQuery };
    }

    payload["data"] = item;

    return {
      path: `/comments`,
      params: query ?? {},
      body: JSON.stringify(payload),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateComment
 * @description Update an existing comment.
 * @param key
 * @param item
 * @param query
 */
export const updateComment =
  <Schema, const TQuery extends Query<Schema, MezaComment<Schema>>>(
    key: MezaComment<Schema>["id"],
    item: Partial<MezaComment<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateCommentOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/comments/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
