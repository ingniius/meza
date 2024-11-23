import type { MergeCoreCollection } from "../index";
import type { MezaCollection } from "./collection";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaVersion<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_versions",
  {
    id: string;
    key: string;
    name: string | null;
    collection: MezaCollection<Schema> | string;
    item: string;
    hash: string;
    date_created: "datetime" | null;
    date_updated: "datetime" | null;
    user_created: MezaUser<Schema> | string | null;
    user_updated: MezaUser<Schema> | string | null;
    delta: Record<string, any> | null;
  }
>;
