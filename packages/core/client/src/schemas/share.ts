import type { MergeCoreCollection } from "../index";
import type { MezaRole } from "./role";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaShare<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_shares",
  {
    id: string;
    name: string | null;
    collection: string | null;
    item: string | null;
    role: MezaRole<Schema> | string | null;
    password: string | null;
    user_created: MezaUser<Schema> | string | null;
    date_created: "datetime" | null;
    date_start: "datetime" | null;
    date_end: "datetime" | null;
    times_used: number | null;
    max_uses: number | null;
  }
>;
