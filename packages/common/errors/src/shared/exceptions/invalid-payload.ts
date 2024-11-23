import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 */
export interface InvalidPayloadErrorExtensions {
  reason: string;
}

/**
 * @internal
 */
export const messageConstructor = ({ reason }: InvalidPayloadErrorExtensions) => `Invalid payload. ${reason}.`;

/**
 * @publicApi
 * @name InvalidPayloadError
 */
export const InvalidPayloadError = createError<InvalidPayloadErrorExtensions>(
  ErrorCode.InvalidPayload,
  messageConstructor,
  400,
);
