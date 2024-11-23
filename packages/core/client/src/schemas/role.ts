import type { MergeCoreCollection } from "../index";
import type { MezaPolicy } from "./policy";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaRole<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_roles",
  {
    id: string;
    name: string;
    icon: string;
    description: string | null;
    parent: string | MezaRole<Schema>;
    children: string[] | MezaRole<Schema>[];
    policies: string[] | MezaPolicy<Schema>[];
    users: string[] | MezaUser<Schema>[];
  }
>;
