import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 */
interface ForbiddenErrorExtensions {
  reason: string;
}

/**
 * @internal
 */
export const messageConstructor = (ext: ForbiddenErrorExtensions | void) => {
  if (ext?.reason) return ext.reason;
  return `You don't have permission to access this.`;
};

/**
 * @publicApi
 * @name ContentTooLargeError
 */
export const ForbiddenError = createError(ErrorCode.Forbidden, messageConstructor, 403);
