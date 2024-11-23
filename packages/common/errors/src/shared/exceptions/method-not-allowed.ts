import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 */
export interface MethodNotAllowedErrorExtensions {
  allowed: string[];
  current: string;
}

/**
 * @internal
 */
export const messageConstructor = (extensions: MethodNotAllowedErrorExtensions) =>
  `Invalid method "${extensions.current}" used. Should be one of ${extensions.allowed
    .map((method) => `"${method}"`)
    .join(", ")}.`;

/**
 * @publicApi
 * @name MethodNotAllowedError
 */
export const MethodNotAllowedError = createError<MethodNotAllowedErrorExtensions>(
  ErrorCode.MethodNotAllowed,
  messageConstructor,
  405,
);
