import type { MezaComment } from "../../../schemas/comment";
import type { Query } from "../../../types/query";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteComments
 * @description Delete multiple existing comments.
 * @param keysOrQuery The primary keys or a query
 */
export const deleteComments =
  <Schema>(keysOrQuery: MezaComment<Schema>["id"][] | Query<Schema, MezaComment<Schema>>): RestCommand<void, Schema> =>
  () => {
    let payload: Record<string, any> = {};

    if (Array.isArray(keysOrQuery)) {
      throwIfEmpty(keysOrQuery, "keysOrQuery cannot be empty");
      payload = { keys: keysOrQuery };
    } else {
      throwIfEmpty(Object.keys(keysOrQuery), "keysOrQuery cannot be empty");
      payload = { query: keysOrQuery };
    }

    return {
      path: `/comments`,
      body: JSON.stringify(payload),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteComment
 * @description Delete an existing comment.
 * @param key
 */
export const deleteComment =
  <Schema>(key: MezaComment<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/comments/${key}`,
      method: "DELETE",
    };
  };
