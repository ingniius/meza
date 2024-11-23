import type { MezaWebhook } from "../../../schemas/webhook";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateWebhookOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaWebhook<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createWebhooks
 * @description Create multiple new webhooks.
 * @param items The webhooks to create
 * @param query Optional return data query
 */
export const createWebhooks =
  <Schema, const TQuery extends Query<Schema, MezaWebhook<Schema>>>(
    items: Partial<MezaWebhook<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateWebhookOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/webhooks`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createWebhook
 * @description Create a new webhook.
 * @param item The webhook to create
 * @param query Optional return data query.
 */
export const createWebhook =
  <Schema, const TQuery extends Query<Schema, MezaWebhook<Schema>>>(
    item: Partial<MezaWebhook<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateWebhookOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/webhooks`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
