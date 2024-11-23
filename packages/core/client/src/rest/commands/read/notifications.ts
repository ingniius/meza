import type { MezaNotification } from "../../../schemas/notification";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadNotificationOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaNotification<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readNotifications
 * @description List all notifications that exist in Meza.
 * @param query The query parameters
 */
export const readNotifications =
  <Schema, const TQuery extends Query<Schema, MezaNotification<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadNotificationOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/notifications`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readNotification
 * @description List an existing notification by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readNotification =
  <Schema, const TQuery extends Query<Schema, MezaNotification<Schema>>>(
    key: MezaNotification<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadNotificationOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/notifications/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
