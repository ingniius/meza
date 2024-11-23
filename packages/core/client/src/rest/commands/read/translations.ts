import type { MezaTranslation } from "../../../schemas/translation";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadTranslationOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaTranslation<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readTranslations
 * @description List all Translations that exist in Meza.
 * @param query The query parameters
 */
export const readTranslations =
  <Schema, const TQuery extends Query<Schema, MezaTranslation<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadTranslationOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/translations`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readTranslation
 * @description List an existing Translation by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readTranslation =
  <Schema, const TQuery extends Query<Schema, MezaTranslation<Schema>>>(
    key: MezaTranslation<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadTranslationOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/translations/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
