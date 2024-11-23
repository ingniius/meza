import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 */
export interface RouteNotFoundErrorExtensions {
  path: string;
}

/**
 * @internal
 */
export const messageConstructor = ({ path }: RouteNotFoundErrorExtensions) => `Route ${path} doesn't exist.`;

/**
 * @publicApi
 * @name RouteNotFoundError
 */
export const RouteNotFoundError = createError(ErrorCode.RouteNotFound, messageConstructor, 404);
