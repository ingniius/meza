import type { MergeCoreCollection } from "../index";
import type { MezaDashboard } from "./dashboard";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaPanel<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_panels",
  {
    id: string;
    dashboard: MezaDashboard<Schema> | string;
    name: string | null;
    icon: string | null;
    color: string | null;
    show_header: boolean;
    note: string | null;
    type: string;
    position_x: number;
    position_y: number;
    width: number;
    height: number;
    options: Record<string, any> | null;
    date_created: "datetime" | null;
    user_created: MezaUser<Schema> | string | null;
  }
>;
