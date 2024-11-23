import type { MezaVersion } from "../../../schemas/version";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateContentVersionOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaVersion<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createContentVersions
 * @description Create multiple new Content Versions.
 * @param items The Content Versions to create
 * @param query Optional return data query
 */
export const createContentVersions =
  <Schema, const TQuery extends Query<Schema, MezaVersion<Schema>>>(
    items: Partial<MezaVersion<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateContentVersionOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/versions`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createContentVersion
 * @description Create a new Content Version.
 * @param item The Content Version to create
 * @param query Optional return data query
 */
export const createContentVersion =
  <Schema, const TQuery extends Query<Schema, MezaVersion<Schema>>>(
    item: Partial<MezaVersion<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateContentVersionOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/versions`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
