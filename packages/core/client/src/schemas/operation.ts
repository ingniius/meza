import type { MergeCoreCollection } from "../index";
import type { MezaFlow } from "./flow";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaOperation<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_operations",
  {
    id: string;
    name: string | null;
    key: string;
    type: string;
    position_x: number;
    position_y: number;
    timestamp: string;
    options: Record<string, any> | null;
    resolve: MezaOperation<Schema> | string | null;
    reject: MezaOperation<Schema> | string | null;
    flow: MezaFlow<Schema> | string;
    date_created: "datetime" | null;
    user_created: MezaUser<Schema> | string | null;
  }
>;
