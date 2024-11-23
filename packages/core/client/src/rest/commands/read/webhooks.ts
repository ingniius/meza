import type { MezaWebhook } from "../../../schemas/webhook";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadWebhookOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaWebhook<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readWebhooks
 * @description List all Webhooks that exist in Meza.
 * @param query The query parameters
 */
export const readWebhooks =
  <Schema, const TQuery extends Query<Schema, MezaWebhook<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadWebhookOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/webhooks`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readWebhook
 * @description List an existing Webhook by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readWebhook =
  <Schema, const TQuery extends Query<Schema, MezaWebhook<Schema>>>(
    key: MezaWebhook<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadWebhookOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/webhooks/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
