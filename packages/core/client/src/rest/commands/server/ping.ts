import type { RestCommand } from "../../types.js";

/**
 * @publicApi
 * @name serverPing
 * @description Ping... pong! 🏓
 */
export const serverPing =
  <Schema>(): RestCommand<string, Schema> =>
  () => ({
    method: "GET",
    path: "/server/ping",
  });
