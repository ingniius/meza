import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 */
export interface UnsupportedMediaTypeErrorExtensions {
  mediaType: string;
  where: string;
}

/**
 * @internal
 */
export const messageConstructor = (extensions: UnsupportedMediaTypeErrorExtensions) =>
  `Unsupported media type "${extensions.mediaType}" in ${extensions.where}.`;

/**
 * @publicApi
 * @name UnsupportedMediaTypeError
 */
export const UnsupportedMediaTypeError = createError<UnsupportedMediaTypeErrorExtensions>(
  ErrorCode.UnsupportedMediaType,
  messageConstructor,
  415,
);
