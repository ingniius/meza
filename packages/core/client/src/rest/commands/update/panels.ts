import type { MezaPanel } from "../../../schemas/panel";
import type { ApplyQueryFields, NestedPartial, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type UpdatePanelOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPanel<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name updatePanels
 * @description Update multiple existing panels.
 * @param keys
 * @param item
 * @param query
 */
export const updatePanels =
  <Schema, const TQuery extends Query<Schema, MezaPanel<Schema>>>(
    keys: MezaPanel<Schema>["id"][],
    item: Partial<MezaPanel<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdatePanelOutput<Schema, TQuery>[], Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/panels`,
      params: query ?? {},
      body: JSON.stringify({ keys, data: item }),
      method: "PATCH",
    };
  };

/**
 * @publicApi
 * @name updatePanelsBatch
 * @description Update multiple panels as batch.
 * @param items
 * @param query
 */
export const updatePanelsBatch =
  <Schema, const TQuery extends Query<Schema, MezaPanel<Schema>>>(
    items: NestedPartial<MezaPanel<Schema>>[],
    query?: TQuery,
  ): RestCommand<UpdatePanelOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/panels`,
    params: query ?? {},
    body: JSON.stringify(items),
    method: "PATCH",
  });

/**
 * @publicApi
 * @name updatePanel
 * @description Update an existing panel.
 * @param key
 * @param item
 * @param query
 */
export const updatePanel =
  <Schema, const TQuery extends Query<Schema, MezaPanel<Schema>>>(
    key: MezaPanel<Schema>["id"],
    item: Partial<MezaPanel<Schema>>,
    query?: TQuery,
  ): RestCommand<UpdatePanelOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/panels/${key}`,
      params: query ?? {},
      body: JSON.stringify(item),
      method: "PATCH",
    };
  };
