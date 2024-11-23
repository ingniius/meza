import type { Collection, CollectionType } from "@azem/types/collection";

/**
 * @publicApi
 * @name getCollectionType
 * @description Get the type of collection. One of alias | table. (And later: view)
 * @param collection Collection object to get the type of
 */
export function getCollectionType(collection: Collection): CollectionType {
  if (collection.schema) return "table";
  if (collection.meta) return "alias";
  return "unknown";
}
