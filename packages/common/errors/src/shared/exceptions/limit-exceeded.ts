import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 */
export interface LimitExceededErrorExtensions {
  category: string;
}

/**
 * @internal
 */
export const messageConstructor = ({ category }: LimitExceededErrorExtensions) => {
  return `${category} limit exceeded.`;
};

/**
 * @publicApi
 * @name LimitExceededError
 */
export const LimitExceededError = createError<LimitExceededErrorExtensions>(
  ErrorCode.LimitExceeded,
  messageConstructor,
  403,
);
