import type { MergeCoreCollection } from "../index";

/**
 * @publicApi
 */
export type MezaWebhook<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_webhooks",
  {
    id: number;
    name: string;
    method: string;
    url: string;
    status: string;
    data: boolean;
    actions: string | string[];
    collections: string | string[];
    headers: Record<string, any> | null;
  }
>;
