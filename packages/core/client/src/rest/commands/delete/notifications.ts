import type { MezaNotification } from "../../../schemas/notification";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteNotifications
 * @description Delete multiple existing notifications.
 * @param keys
 */
export const deleteNotifications =
  <Schema>(keys: MezaNotification<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/notifications`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteNotification
 * @description Delete an existing notification.
 * @param key
 */
export const deleteNotification =
  <Schema>(key: MezaNotification<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/notifications/${key}`,
      method: "DELETE",
    };
  };
