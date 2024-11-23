import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 * @name InvalidCredentialsError
 */
export const InvalidCredentialsError = createError(ErrorCode.InvalidCredentials, "Invalid user credentials.", 401);
