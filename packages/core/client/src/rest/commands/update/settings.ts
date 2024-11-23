import type { MezaSettings } from "../../../schemas/settings";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type UpdateSettingOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaSettings<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateSettings
 * @description Update Settings
 * @param item
 * @param query
 */
export const updateSettings =
  <Schema, const TQuery extends Query<Schema, MezaSettings<Schema>>>(
    item: Partial<MezaSettings<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateSettingOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/settings`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "PATCH",
  });
