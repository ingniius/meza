import type { MergeCoreCollection } from "../index";
import type { MezaRole } from "./role";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaPreset<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_presets",
  {
    id: number;
    bookmark: string | null;
    user: MezaUser<Schema> | string | null;
    role: MezaRole<Schema> | string | null;
    collection: string | null; // TODO keyof complete schema
    search: string | null;
    layout: string | null;
    layout_query: Record<string, any> | null;
    layout_options: Record<string, any> | null;
    refresh_interval: number | null;
    filter: Record<string, any> | null;
    icon: string | null;
    color: string | null;
  }
>;
