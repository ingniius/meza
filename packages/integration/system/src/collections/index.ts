import type { BaseCollectionMeta, DataCollectionMeta } from "../types";
import systemData from "./collections.yaml";

/**
 * @publicApi
 * @name systemCollectionRows
 */
export const systemCollectionRows = (systemData["data"] as DataCollectionMeta[]).map(
  (row) =>
    ({
      ...(systemData["defaults"] as Partial<BaseCollectionMeta>),
      ...row,
      system: true,
    }) as BaseCollectionMeta,
);

/**
 * @publicApi
 * @name systemCollectionNames
 */
export const systemCollectionNames: string[] = (systemData["data"] as DataCollectionMeta[]).map(
  (row) => row["collection"]!,
);

/**
 * @publicApi
 * @name isSystemCollection
 */
export function isSystemCollection(collection: string): boolean {
  return systemCollectionNames.includes(collection);
}
