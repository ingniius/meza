import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 * @name InvalidIpError
 */
export const InvalidIpError = createError(ErrorCode.InvalidIp, "Invalid IP address.", 401);
