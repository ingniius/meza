import type { AuthenticationClient } from "../auth/types";
import type { MezaClient } from "../types/client";
import { getRequestUrl } from "../utils/get-request-url";
import { request } from "../utils/request";
import type { GraphqlClient, GraphqlConfig } from "./types";

/**
 * @private
 */
const defaultConfigValues: GraphqlConfig = {};

/**
 * @publicApi
 * @description Creates a client to communicate with Meza GraphQL.
 */
export const graphql = (config: Partial<GraphqlConfig> = {}) => {
  return <Schema>(client: MezaClient<Schema>): GraphqlClient<Schema> => {
    const gqlConfig = { ...defaultConfigValues, ...config };
    return {
      async query<Output extends object = Record<string, any>>(
        query: string,
        variables?: Record<string, unknown>,
        scope: "items" | "system" = "items",
      ): Promise<Output> {
        const fetchOptions: RequestInit = {
          method: "POST",
          body: JSON.stringify({ query, variables }),
        };

        if ("credentials" in gqlConfig) {
          fetchOptions.credentials = gqlConfig.credentials;
        }

        const headers: Record<string, string> = {};

        if ("getToken" in this) {
          const token = await (this.getToken as AuthenticationClient<Schema>["getToken"])();

          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        }

        if ("Content-Type" in headers === false) {
          headers["Content-Type"] = "application/json";
        }

        fetchOptions.headers = headers;
        const requestPath = scope === "items" ? "/graphql" : "/graphql/system";
        const requestUrl = getRequestUrl(client.url, requestPath);

        return await request<Output>(requestUrl.toString(), fetchOptions, client.globals.fetch);
      },
    };
  };
};
