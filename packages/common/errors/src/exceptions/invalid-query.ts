import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 */
export interface InvalidQueryErrorExtensions {
  reason: string;
}

/**
 * @internal
 */
export const messageConstructor = ({ reason }: InvalidQueryErrorExtensions) => `Invalid query. ${reason}.`;

/**
 * @publicApi
 * @name InvalidQueryError
 */
export const InvalidQueryError = createError<InvalidQueryErrorExtensions>(
  ErrorCode.InvalidQuery,
  messageConstructor,
  400,
);
