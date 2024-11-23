import type { Dict } from "./generic";

/**
 * @publicApi
 */
export type ContentVersion = {
  id: string;
  key: string;
  name: string | null;
  collection: string;
  item: string;
  hash: string;
  date_created: string;
  date_updated: string | null;
  user_created: string | null;
  user_updated: string | null;
  delta: Dict<string, any> | null;
};
