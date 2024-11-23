import type { RestCommand } from "../../types";

/**
 * @publicApi
 */
export type OpenApiSpecOutput = Record<string, any>;

/**
 * @publicApi
 * @name readOpenApiSpec
 * @description Retrieve the OpenAPI spec for the current project.
 */
export const readOpenApiSpec =
  <Schema>(): RestCommand<OpenApiSpecOutput, Schema> =>
  () => ({
    method: "GET",
    path: "/server/specs/oas",
  });
