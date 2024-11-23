import type { RestCommand } from "../../types";

/**
 * @publicApi
 * @name readGraphqlSdl
 * @description Retrieve the GraphQL SDL for the current project.
 */
export const readGraphqlSdl =
  <Schema>(scope: "item" | "system" = "item"): RestCommand<string, Schema> =>
  () => ({
    method: "GET",
    path: scope === "item" ? "/server/specs/graphql" : "/server/specs/graphql/system",
  });
