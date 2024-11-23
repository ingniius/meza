import type { MergeCoreCollection } from "../index";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaNotification<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_notifications",
  {
    id: string;
    timestamp: "datetime" | null;
    status: string | null;
    recipient: MezaUser<Schema> | string;
    sender: MezaUser<Schema> | string | null;
    subject: string;
    message: string | null;
    collection: string | null; // TODO keyof complete schema
    item: string | null;
  }
>;
