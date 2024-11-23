import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 * @name InvalidTokenError
 */
export const InvalidTokenError = createError(ErrorCode.InvalidToken, "Invalid token.", 403);
