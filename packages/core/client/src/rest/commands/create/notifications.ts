import type { MezaNotification } from "../../../schemas/notification";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateNotificationOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaNotification<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createNotifications
 * @description Create multiple new notifications.
 * @param items The notifications to create
 * @param query Optional return data query
 */
export const createNotifications =
  <Schema, const TQuery extends Query<Schema, MezaNotification<Schema>>>(
    items: Partial<MezaNotification<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateNotificationOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/notifications`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createNotification
 * @description Create a new notification.
 * @param item The notification to create
 * @param query Optional return data query
 */
export const createNotification =
  <Schema, const TQuery extends Query<Schema, MezaNotification<Schema>>>(
    item: Partial<MezaNotification<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateNotificationOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/notifications`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
