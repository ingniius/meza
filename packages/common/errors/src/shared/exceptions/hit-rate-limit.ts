import { ErrorCode } from "@azem/enums/code";

import ms from "ms";

import { createError } from "../../create-error";

/**
 * @publicApi
 */
export interface HitRateLimitErrorExtensions {
  limit: number;
  reset: Date;
}

/**
 * @publicApi
 */
export const messageConstructor = (extensions: HitRateLimitErrorExtensions) => {
  const msBeforeNext = extensions.reset.getTime() - Date.now();
  return `Too many requests, retry after ${ms(msBeforeNext)}.`;
};

/**
 * @publicApi
 * @name HitRateLimitError
 */
export const HitRateLimitError = createError<HitRateLimitErrorExtensions>(
  ErrorCode.RequestsExceeded,
  messageConstructor,
  429,
);
