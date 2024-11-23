import type { MezaNotification } from "../../../schemas/notification";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateNotificationOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaNotification<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateNotifications
 * @description Update multiple existing notifications.
 * @param keys
 * @param item
 * @param query
 */
export const updateNotifications =
  <Schema, const TQuery extends Query<Schema, MezaNotification<Schema>>>(
    keys: MezaNotification<Schema>["id"][],
    item: Partial<MezaNotification<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateNotificationOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/notifications`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateNotificationsBatch
 * @description Update multiple notifications as batch.
 * @param items
 * @param query
 */
export const updateNotificationsBatch =
  <Schema, const TQuery extends Query<Schema, MezaNotification<Schema>>>(
    items: NestedPartial<MezaNotification<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateNotificationOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/notifications`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updateNotification
 * @description Update an existing notification.
 * @param key
 * @param item
 * @param query
 */
export const updateNotification =
  <Schema, const TQuery extends Query<Schema, MezaNotification<Schema>>>(
    key: MezaNotification<Schema>["id"],
    item: Partial<MezaNotification<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateNotificationOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/notifications/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
