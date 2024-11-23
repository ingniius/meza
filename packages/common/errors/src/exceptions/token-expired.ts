import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 * @name TokenExpiredError
 */
export const TokenExpiredError = createError(ErrorCode.TokenExpired, "Token expired.", 401);
