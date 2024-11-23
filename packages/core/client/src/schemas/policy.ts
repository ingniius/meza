import type { MergeCoreCollection } from "../index";
import type { MezaPermission } from "./permission";
import type { MezaRole } from "./role";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaPolicy<Schema> = MergeCoreCollection<
  Schema,
  "meza_policies",
  {
    id: string; // uuid
    name: string;
    icon: string;
    description: string | null;
    ip_access: string | null;
    enforce_tfa: boolean;
    admin_access: boolean;
    app_access: boolean;
    permissions: number[] | MezaPermission<Schema>[];
    users: string[] | MezaUser<Schema>[];
    roles: string[] | MezaRole<Schema>[];
  }
>;
