import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 */
export interface UnprocessableContentErrorExtensions {
  reason: string;
}

/**
 * @internal
 */
const messageConstructor = (extensions: UnprocessableContentErrorExtensions) =>
  `Can't process content. ${extensions.reason}.`;

/**
 * @publicApi
 * @name UnprocessableContentError
 */
export const UnprocessableContentError = createError<UnprocessableContentErrorExtensions>(
  ErrorCode.UnprocessableContent,
  messageConstructor,
  422,
);
