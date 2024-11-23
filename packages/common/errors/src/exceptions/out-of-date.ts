import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 * @name OutOfDateError
 */
export const OutOfDateError = createError(
  ErrorCode.OutOfDate,
  "Operation could not be executed: Your current instance of Meza is out of date.",
  503,
);
