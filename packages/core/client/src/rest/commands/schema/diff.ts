import type { RestCommand } from "../../types";
import type { SchemaSnapshotOutput } from "./snapshot";

/**
 * @publicApi
 */
export type SchemaDiffOutput = {
  hash: string;
  diff: Record<string, any>;
};

/**
 * @publicApi
 * @name schemaDiff
 * @description Compare the current instance's schema against the schema snapshot in JSON request body and retrieve the difference. This endpoint is only available to admin users.
 * @param snapshot JSON object containing collections, fields, and relations to apply.
 * @param force Bypass version and database vendor restrictions.
 */
export const schemaDiff =
  <Schema>(snapshot: SchemaSnapshotOutput, force = false): RestCommand<SchemaDiffOutput, Schema> =>
  () => ({
    method: "POST",
    path: "/schema/diff",
    params: force ? { force } : {},
    body: JSON.stringify(snapshot),
  });
