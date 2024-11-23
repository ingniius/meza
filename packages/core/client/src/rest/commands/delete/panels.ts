import type { MezaPanel } from "../../../schemas/panel";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name deletePanels
 * @description Delete multiple existing panels.
 * @param keys
 */
export const deletePanels =
  <Schema>(keys: MezaPanel<Schema>["id"][]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(keys, "Keys cannot be empty");

    return {
      path: `/panels`,
      body: JSON.stringify(keys),
      method: "DELETE",
    };
  };

/**
 * @publicApi
 * @name deletePanel
 * @description Delete an existing panel.
 * @param key
 */
export const deletePanel =
  <Schema>(key: MezaPanel<Schema>["id"]): RestCommand<void, Schema> =>
  () => {
    throwIfEmpty(key, "Key cannot be empty");

    return {
      path: `/panels/${key}`,
      method: "DELETE",
    };
  };
