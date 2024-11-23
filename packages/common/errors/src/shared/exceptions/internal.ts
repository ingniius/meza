import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 * @name InternalServerError
 */
export const InternalServerError = createError(ErrorCode.Internal, `An unexpected error occurred.`);
