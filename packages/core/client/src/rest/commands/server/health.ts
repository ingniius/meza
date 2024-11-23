import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type ServerHealthOutput = {
  status: "ok" | "warn" | "error";
  releaseId?: string;
  serviceId?: string;
  checks?: {
    [name: string]: Record<string, any>[];
  };
};

/**
 * @publicApi
 * @name serverHealth
 * @description Get the current health status of the server.
 */
export const serverHealth =
  <Schema>(): RestCommand<ServerHealthOutput, Schema> =>
  () => ({
    method: "GET",
    path: "/server/health",
  });
