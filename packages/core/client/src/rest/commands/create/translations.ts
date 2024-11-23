import type { MezaTranslation } from "../../../schemas/translation";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreateTranslationOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaTranslation<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createTranslations
 * @description Create multiple new translation.
 * @param items The translations to create
 * @param query Optional return data query
 */
export const createTranslations =
  <Schema, const TQuery extends Query<Schema, MezaTranslation<Schema>>>(
    items: Partial<MezaTranslation<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreateTranslationOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/translations`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createTranslation
 * @description Create a new translation.
 * @param item The translation to create
 * @param query Optional return data query
 */
export const createTranslation =
  <Schema, const TQuery extends Query<Schema, MezaTranslation<Schema>>>(
    item: Partial<MezaTranslation<Schema>>,
    query?: TQuery,
  ): RestCommand<CreateTranslationOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/translations`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
