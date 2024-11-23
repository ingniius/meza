import type { Table } from "./schema";

/**
 * @publicApi
 */
export interface AppCollection extends Collection {
  name: string;
  icon: string;
  type: CollectionType;
  color?: string | null;
}

/**
 * @publicApi
 */
export interface Collection {
  collection: string;
  meta: CollectionMeta | null;
  schema: Table | null;
}

/**
 * @publicApi
 */
export type CollectionMeta = {
  collection: string;
  note: string | null;
  hidden: boolean;
  singleton: boolean;
  icon: string | null;
  color: string | null;
  translations: Translations[] | null;
  display_template: string | null;
  preview_url: string | null;
  versioning: boolean;
  sort_field: string | null;
  archive_field: string | null;
  archive_value: string | null;
  unarchive_value: string | null;
  archive_app_filter: boolean;
  item_duplication_fields: string[] | null;
  accountability: "all" | "activity" | null;
  system: boolean | null;
  sort: number | null;
  group: string | null;
  collapse: "open" | "closed" | "locked";
};

/**
 * @publicApi
 */
export type CollectionType = "alias" | "table" | "unknown";

/**
 * @internal
 */
type Translations = {
  language: string;
  translation: string;
  singular: string;
  plural: string;
};
