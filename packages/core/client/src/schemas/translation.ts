import type { MergeCoreCollection } from "../index";

/**
 * @publicApi
 */
export type MezaTranslation<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_translations",
  {
    id: string; // uuid
    language: string;
    key: string;
    value: string;
  }
>;
