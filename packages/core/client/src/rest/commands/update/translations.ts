import type { MezaTranslation } from "../../../schemas/translation";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdateTranslationOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaTranslation<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updateTranslations
 * @description Update multiple existing translations.
 * @param keys
 * @param item
 * @param query
 */
export const updateTranslations =
  <Schema, const TQuery extends Query<Schema, MezaTranslation<Schema>>>(
    keys: MezaTranslation<Schema>["id"][],
    item: Partial<MezaTranslation<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateTranslationOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/translations`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updateTranslationsBatch
 * @description Update multiple translations as batch.
 * @param items
 * @param query
 */
export const updateTranslationsBatch =
  <Schema, const TQuery extends Query<Schema, MezaTranslation<Schema>>>(
    items: Partial<MezaTranslation<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdateTranslationOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/translations`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updateTranslation
 * @description Update an existing translation.
 * @param key
 * @param item
 * @param query
 */
export const updateTranslation =
  <Schema, const TQuery extends Query<Schema, MezaTranslation<Schema>>>(
    key: MezaTranslation<Schema>["id"],
    item: Partial<MezaTranslation<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdateTranslationOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/translations/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
