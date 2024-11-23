import type { MezaClient } from "../types/client";
import type { StaticTokenClient } from "./types";

/**
 * @publicApi
 * @name staticToken
 * @description Creates a client to authenticate with Meza using a static token.
 * @param token static token
 */
export function staticToken(access_token: string) {
  return <Schema>(_client: MezaClient<Schema>): StaticTokenClient<Schema> => {
    let token: string | null = access_token ?? null;
    return {
      async getToken() {
        return token;
      },
      async setToken(access_token: string | null) {
        token = access_token;
      },
    };
  };
}
