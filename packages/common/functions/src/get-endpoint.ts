import { isSystemCollection } from "@azem/system/collections";

/**
 * @publicApi
 * @name getEndpoint
 * @param collection
 */
export function getEndpoint(collection: string): string {
  if (isSystemCollection(collection)) return `/${collection.substring(5)}`;
  return `/items/${collection}`;
}
