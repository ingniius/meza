import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 * @name UserSuspendedError
 */
export const UserSuspendedError = createError(ErrorCode.UserSuspended, "User suspended.", 401);
