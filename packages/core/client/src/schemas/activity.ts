import type { MergeCoreCollection } from "../index";
import type { MezaRevision } from "./revision";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaActivity<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_activity",
  {
    id: number;
    action: string;
    user: MezaUser<Schema> | string | null;
    timestamp: "datetime";
    ip: string | null;
    user_agent: string | null;
    collection: string;
    item: string;
    comment: string | null;
    origin: string | null;
    revisions: MezaRevision<Schema>[] | number[] | null;
  }
>;
