import type { RestCommand } from "../../types";

/**
 * @publicApi
 * @name utilitySort
 * @description If a collection has a sort field, this util can be used to move items in that manual order.
 */
export const utilitySort =
  <Schema>(collection: keyof Schema, item: string, to: number): RestCommand<void, Schema> =>
  () => ({
    method: "POST",
    path: `/utils/sort/${collection as string}`,
    body: JSON.stringify({ item, to }),
  });
