import type { RestCommand } from "../../types";

// TODO better options for ouput typing

/**
 * @publicApi
 * @name triggerOperation
 * @description Trigger an operation.
 * @param id
 * @param data
 */
export const triggerOperation =
  <Schema>(id: string, data?: any): RestCommand<unknown, Schema> =>
  () => ({
    path: `/operations/trigger/${id}`,
    body: JSON.stringify(data ?? {}),
    method: "POST",
  });
