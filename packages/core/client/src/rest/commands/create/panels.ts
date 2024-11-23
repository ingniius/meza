import type { MezaPanel } from "../../../schemas/panel";
import type { ApplyQueryFields, Query } from "../../../types/index";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type CreatePanelOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPanel<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name createPanels
 * @description Create multiple new panels.
 * @param items The panel to create
 * @param query Optional return data query
 */
export const createPanels =
  <Schema, const TQuery extends Query<Schema, MezaPanel<Schema>>>(
    items: Partial<MezaPanel<Schema>>[],
    query?: TQuery,
  ): RestCommand<CreatePanelOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/panels`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "POST",
  });

/**
 * @publicApi
 * @name createPanel
 * @description Create a new panel.
 * @param item The panel to create
 * @param query Optional return data query
 */
export const createPanel =
  <Schema, const TQuery extends Query<Schema, MezaPanel<Schema>>>(
    item: Partial<MezaPanel<Schema>>,
    query?: TQuery,
  ): RestCommand<CreatePanelOutput<Schema, TQuery>, Schema> =>
  () => ({
    path: `/panels`,
    params: query ?? {},
    body: JSON.stringify(item),
    method: "POST",
  });
