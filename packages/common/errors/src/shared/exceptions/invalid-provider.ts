import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 * @name InvalidProviderError
 */
export const InvalidProviderError = createError(ErrorCode.InvalidProvider, "Invalid provider.", 403);
