import type { Query } from "../../../index";
import type { MezaFile } from "../../../schemas/file";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type FileFormat = "csv" | "json" | "xml" | "yaml";

/**
 * @publicApi
 * @name utilsExport
 * @description Export a larger data set to a file in the File Library.
 */
export const utilsExport =
  <Schema, TQuery extends Query<Schema, Schema[Collection]>, Collection extends keyof Schema>(
    collection: Collection,
    format: FileFormat,
    query: TQuery,
    file: Partial<MezaFile<Schema>>,
  ): RestCommand<void, Schema> =>
  () => ({
    method: "POST",
    path: `/utils/export/${collection as string}`,
    body: JSON.stringify({ format, query, file }),
  });
