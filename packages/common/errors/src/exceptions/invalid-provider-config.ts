import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 */
export interface InvalidProviderConfigErrorExtensions {
  provider: string;
  reason?: string;
}

/**
 * @publicApi
 * @name InvalidProviderConfigError
 */
export const InvalidProviderConfigError = createError<InvalidProviderConfigErrorExtensions>(
  ErrorCode.InvalidProviderConfig,
  "Invalid config.",
  503,
);
