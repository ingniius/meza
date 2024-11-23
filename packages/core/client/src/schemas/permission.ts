import type { MergeCoreCollection } from "../index";
import type { MezaPolicy } from "./policy";

/**
 * @publicApi
 */
export type MezaPermission<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_permissions",
  {
    id: number;
    policy: MezaPolicy<Schema> | string | null;
    collection: string; // TODO keyof complete schema
    action: string;
    permissions: Record<string, any> | null;
    validation: Record<string, any> | null;
    presets: Record<string, any> | null;
    fields: string[] | null;
  }
>;
