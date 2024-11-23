import type { MergeCoreCollection } from "../index";
import type { MezaCollection } from "./collection";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaComment<Schema> = MergeCoreCollection<
  Schema,
  "meza_comments",
  {
    id: string;
    collection: MezaCollection<Schema> | string;
    item: string;
    comment: string;
    date_created: "datetime" | null;
    date_updated: "datetime" | null;
    user_created: MezaUser<Schema> | string | null;
    user_updated: MezaUser<Schema> | string | null;
  }
>;
