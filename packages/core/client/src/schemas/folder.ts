import type { MergeCoreCollection } from "../index";

/**
 * @publicApi
 */
export type MezaFolder<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_folders",
  {
    id: string;
    name: string;
    parent: MezaFolder<Schema> | string | null;
  }
>;
