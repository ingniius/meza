import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 * @name ContentTooLargeError
 */
export const ContentTooLargeError = createError(ErrorCode.ContentTooLarge, "Uploaded content is too large.", 413);
