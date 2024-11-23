import type { MezaPanel } from "../../../schemas/panel";
import type { ApplyQueryFields, Query } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 */
export type ReadPanelOutput<
  Schema,
  TQuery extends Query<Schema, Item>,
  Item extends object = MezaPanel<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery["fields"]>;

/**
 * @publicApi
 * @name readPanels
 * @description List all Panels that exist in Meza.
 * @param query The query parameters
 */
export const readPanels =
  <Schema, const TQuery extends Query<Schema, MezaPanel<Schema>>>(
    query?: TQuery,
  ): RestCommand<ReadPanelOutput<Schema, TQuery>[], Schema> =>
  () => ({
    path: `/panels`,
    params: query ?? {},
    method: "GET",
  });

/**
 * @publicApi
 * @name readPanel
 * @description List an existing panel by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 */
export const readPanel =
  <Schema, const TQuery extends Query<Schema, MezaPanel<Schema>>>(
    key: MezaPanel<Schema>["id"],
    query?: TQuery,
  ): RestCommand<ReadPanelOutput<Schema, TQuery>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/panels/${key}`,
      params: query ?? {},
      method: "GET",
    };
  };
