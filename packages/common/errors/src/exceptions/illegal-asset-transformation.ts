import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 */
export interface IllegalAssetTransformationErrorExtensions {
  invalidTransformations: string[];
}

/**
 * @publicApi
 * @name IllegalAssetTransformationError
 */
export const IllegalAssetTransformationError = createError<IllegalAssetTransformationErrorExtensions>(
  ErrorCode.IllegalAssetTransformation,
  "Illegal asset transformation.",
  400,
);
