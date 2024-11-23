import type { MergeCoreCollection } from "../index";
import type { MezaActivity } from "./activity";
import type { MezaVersion } from "./version";

/**
 * @publicApi
 */
export type MezaRevision<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_revisions",
  {
    id: number;
    activity: MezaActivity<Schema> | number;
    collection: string; // TODO keyof complete schema
    item: string;
    data: Record<string, any> | null;
    delta: Record<string, any> | null;
    parent: MezaRevision<Schema> | number | null;
    version: MezaVersion<Schema> | string | null;
  }
>;
