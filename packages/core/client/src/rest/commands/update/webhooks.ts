import type { MezaWebhook } from "../../../schemas/webhook";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateWebhookOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaWebhook<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateWebhooks
 * @description Update multiple existing webhooks.
 * @param keys
 * @param item
 * @param query
 */
export const updateWebhooks =
  <Schema, const TQuery extends Query<Schema, MezaWebhook<Schema>>>(
    keys: MezaWebhook<Schema>["id"][],
    item: Partial<MezaWebhook<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateWebhookOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/webhooks`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateWebhook
 * @description Update an existing webhook.
 * @param key
 * @param item
 * @param query
 */
export const updateWebhook =
  <Schema, const TQuery extends Query<Schema, MezaWebhook<Schema>>>(
    key: MezaWebhook<Schema>["id"],
    item: Partial<MezaWebhook<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateWebhookOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/webhooks/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
