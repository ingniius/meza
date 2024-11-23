import type { MergeCoreCollection } from "../index";
import type { MezaOperation } from "./operation";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaFlow<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_flows",
  {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
    description: string | null;
    status: string;
    trigger: string | null;
    accountability: string | null;
    options: Record<string, any> | null;
    operation: MezaOperation<Schema> | string | null;
    date_created: "datetime" | null;
    user_created: MezaUser<Schema> | string | null;
  }
>;
