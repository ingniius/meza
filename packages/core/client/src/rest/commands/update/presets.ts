import type { MezaPreset } from "../../../schemas/preset";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdatePresetOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPreset<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updatePresets
 * @description Update multiple existing presets.
 * @param keys
 * @param item
 * @param query
 */
export const updatePresets =
  <Schema, const TQuery extends Query<Schema, MezaPreset<Schema>>>(
    keys: MezaPreset<Schema>["id"][],
    item: Partial<MezaPreset<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdatePresetOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/presets`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updatePresetsBatch
 * @description Update multiple presets as batch.
 * @param items
 * @param query
 */
export const updatePresetsBatch =
  <Schema, const TQuery extends Query<Schema, MezaPreset<Schema>>>(
    items: NestedPartial<MezaPreset<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdatePresetOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/presets`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updatePreset
 * @description Update an existing preset.
 * @param key
 * @param item
 * @param query
 */
export const updatePreset =
  <Schema, const TQuery extends Query<Schema, MezaPreset<Schema>>>(
    key: MezaPreset<Schema>["id"],
    item: Partial<MezaPreset<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdatePresetOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/presets/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
