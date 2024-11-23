import type { MergeCoreCollection } from "../index";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaDashboard<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_dashboards",
  {
    id: string;
    name: string;
    icon: string;
    note: string | null;
    date_created: "datetime" | null;
    user_created: MezaUser<Schema> | string | null;
    color: string | null;
  }
>;
