import type { MezaPreset } from "../../../schemas/preset";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadPresetOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPreset<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readPresets
 * @description List all Presets that exist in Meza.
 * @param query The query parameters
 */
export const readPresets =
  <Schema, const TQuery extends Query<Schema, MezaPreset<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadPresetOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/presets`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readPreset
 * @description List an existing preset by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readPreset =
  <Schema, const TQuery extends Query<Schema, MezaPreset<Schema>>>(
    key: MezaPreset<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadPresetOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/presets/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
