import type { MezaWebhook } from "../../../schemas/webhook";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deleteWebhooks
 * @description Delete multiple existing webhooks.
 * @param keys
 */
export const deleteWebhooks =
  <Schema>(keys: MezaWebhook<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/webhooks`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deleteWebhook
 * @description Delete an existing webhook.
 * @param key
 */
export const deleteWebhook =
  <Schema>(key: MezaWebhook<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/webhooks/${key}`,
      method: "DELETE",
    };
  };
