import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type SchemaSnapshotOutput = {
  version: number;
  meza: string;
  vendor: string;
  collections: Record<string, any>[];
  fields: Record<string, any>[];
  relations: Record<string, any>[];
};

/**
 * @publicApi
 * @name schemaSnapshot
 * @description Retrieve the current schema. This endpoint is only available to admin users.
 */
export const schemaSnapshot =
  <Schema>(): RestCommand<SchemaSnapshotOutput, Schema> =>
  () => ({
    method: "GET",
    path: "/schema/snapshot",
  });
