import type { MezaPreset } from "../../../schemas/preset";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreatePresetOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPreset<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createPresets
 * @description Create multiple new presets.
 * @param items The presets to create
 * @param query Optional return data query
 */
export const createPresets =
  <Schema, const TQuery extends Query<Schema, MezaPreset<Schema>>>(
    items: Partial<MezaPreset<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreatePresetOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/presets`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createPreset
 * @description Create a new preset.
 * @param item The preset to create
 * @param query Optional return data query
 */
export const createPreset =
  <Schema, const TQuery extends Query<Schema, MezaPreset<Schema>>>(
    item: Partial<MezaPreset<Schema>>,
    query?: TQuery,
  ): RestCommand<CreatePresetOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/presets`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
