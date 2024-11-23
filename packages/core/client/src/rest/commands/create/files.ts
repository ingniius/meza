import type { MezaFile } from "../../../schemas/file";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateFileOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaFile<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name uploadFiles
 * @description Upload/create a new file.
 * @param data Formdata object
 * @param query The query parameters
 */
export const uploadFiles =
  <Schema, const TQuery extends Query<Schema, MezaFile<Schema>>>(
    data: FormData,
    query?: TQuery,
  ): RestCommand<CreateFileOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: "/files",
    method: "POST",
    body: data,
    params: query ?? {},
    headers: { "Content-Type": "multipart/form-data" },
  });

/**
 * @publicApi
 * @name importFile
 * @description Import a file from the web
 * @param url The url to import the file from
 * @param data Formdata object
 * @param query The query parameters
 */
export const importFile =
  <Schema, TQuery extends Query<Schema, MezaFile<Schema>>>(
    url: string,
    data: Partial<MezaFile<Schema>> = {},
    query?: TQuery,
  ): RestCommand<CreateFileOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: "/files/import",
    method: "POST",
    body: JSON.stringify({ url, data }),
    params: query ?? {},
  });
