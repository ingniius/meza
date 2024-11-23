import type { MezaSettings } from "../../../schemas/settings";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type ReadSettingOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaSettings<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readSettings
 * @description Retrieve Settings.
 * @param query The query parameters
 */
export const readSettings =
  <Schema, const TQuery extends Query<Schema, MezaSettings<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadSettingOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/settings`,
    params: query ?? {},
    method: "GET",
  });
