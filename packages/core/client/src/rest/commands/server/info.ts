import type { WebSocketAuthModes } from "../../../index";
import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type ServerInfoOutput = {
  project: {
    project_name: string;
    default_language: string;
    public_registration: boolean;
    public_registration_verify_email: boolean;
  };
  rateLimit?:
    | {
        points: number;
        duration: number;
      }
    | false;
  rateLimitGlobal?:
    | {
        points: number;
        duration: number;
      }
    | false;
  queryLimit?: {
    default: number;
    max: number;
  };
  websocket?:
    | {
        rest:
          | {
              authentication: WebSocketAuthModes;
              path: string;
            }
          | false;
        graphql:
          | {
              authentication: WebSocketAuthModes;
              path: string;
            }
          | false;
        heartbeat: number | false;
      }
    | false;
};

/**
 * @publicApi
 * @name serverInfo
 * @description Get information about the current installation.
 */
export const serverInfo =
  <Schema>(): RestCommand<ServerInfoOutput, Schema> =>
  () => ({
    method: "GET",
    path: "/server/info",
  });
