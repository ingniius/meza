import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 * @name UnexpectedResponseError
 */
export const UnexpectedResponseError = createError(
  ErrorCode.UnexpectedResponse,
  "Received an unexpected response.",
  503,
);
