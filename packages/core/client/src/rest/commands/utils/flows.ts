import type { RestCommand } from "../../types";

/**
 * @publicApi
 * @name triggerFlow
 * @description Trigger a flow.
 * @param method
 * @param id
 * @param data
 */
export const triggerFlow =
  <Schema>(method: "GET" | "POST", id: string, data?: Record<string, string>): RestCommand<unknown, Schema> =>
  () => {
    if (method === "GET") {
      return {
        path: `/flows/trigger/${id}`,
        params: data ?? {},
        method: "GET",
      };
    }

    return {
      path: `/flows/trigger/${id}`,
      body: JSON.stringify(data ?? {}),
      method: "POST",
    };
  };
