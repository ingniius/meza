import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 * @name InvalidOtpError
 */
export const InvalidOtpError = createError(ErrorCode.InvalidOtp, "Invalid user OTP.", 401);
