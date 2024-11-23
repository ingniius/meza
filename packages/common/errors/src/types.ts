import { ErrorCode } from "@azem/enums/code";

import type { ContainsNullValuesErrorExtensions } from "./shared/exceptions/contains-null-values";
import type { HitRateLimitErrorExtensions } from "./shared/exceptions/hit-rate-limit";
import type { IllegalAssetTransformationErrorExtensions } from "./shared/exceptions/illegal-asset-transformation";
import type { InvalidForeignKeyErrorExtensions } from "./shared/exceptions/invalid-foreign-key";
import type { InvalidPayloadErrorExtensions } from "./shared/exceptions/invalid-payload";
import type { InvalidProviderConfigErrorExtensions } from "./shared/exceptions/invalid-provider-config";
import type { InvalidQueryErrorExtensions } from "./shared/exceptions/invalid-query";
import type { MethodNotAllowedErrorExtensions } from "./shared/exceptions/method-not-allowed";
import type { NotNullViolationErrorExtensions } from "./shared/exceptions/not-null-violation";
import type { RangeNotSatisfiableErrorExtensions } from "./shared/exceptions/range-not-satisfiable";
import type { RecordNotUniqueErrorExtensions } from "./shared/exceptions/record-not-unique";
import type { RouteNotFoundErrorExtensions } from "./shared/exceptions/route-not-found";
import type { ServiceUnavailableErrorExtensions } from "./shared/exceptions/service-unavailable";
import type { UnprocessableContentErrorExtensions } from "./shared/exceptions/unprocessable-content";
import type { UnsupportedMediaTypeErrorExtensions } from "./shared/exceptions/unsupported-media-type";
import type { ValueOutOfRangeErrorExtensions } from "./shared/exceptions/value-out-of-range";
import type { ValueTooLongErrorExtensions } from "./shared/exceptions/value-too-long";

/**
 * @private
 */
type Map = {
  [ErrorCode.ContainsNullValues]: ContainsNullValuesErrorExtensions;
  [ErrorCode.IllegalAssetTransformation]: IllegalAssetTransformationErrorExtensions;
  [ErrorCode.InvalidForeignKey]: InvalidForeignKeyErrorExtensions;
  [ErrorCode.InvalidPayload]: InvalidPayloadErrorExtensions;
  [ErrorCode.InvalidProviderConfig]: InvalidProviderConfigErrorExtensions;
  [ErrorCode.InvalidQuery]: InvalidQueryErrorExtensions;
  [ErrorCode.MethodNotAllowed]: MethodNotAllowedErrorExtensions;
  [ErrorCode.NotNullViolation]: NotNullViolationErrorExtensions;
  [ErrorCode.RangeNotSatisfiable]: RangeNotSatisfiableErrorExtensions;
  [ErrorCode.RecordNotUnique]: RecordNotUniqueErrorExtensions;
  [ErrorCode.RequestsExceeded]: HitRateLimitErrorExtensions;
  [ErrorCode.RouteNotFound]: RouteNotFoundErrorExtensions;
  [ErrorCode.ServiceUnavailable]: ServiceUnavailableErrorExtensions;
  [ErrorCode.UnprocessableContent]: UnprocessableContentErrorExtensions;
  [ErrorCode.UnsupportedMediaType]: UnsupportedMediaTypeErrorExtensions;
  [ErrorCode.ValueOutOfRange]: ValueOutOfRangeErrorExtensions;
  [ErrorCode.ValueTooLong]: ValueTooLongErrorExtensions;
};

/**
 * @publicApi
 * @description Map error codes to error extensions.
 */
export type ExtensionsMap = {
  [code in ErrorCode]: code extends keyof Map ? Map[code] : never;
};

/**
 * @publicApi
 */
export interface MezaError<Extensions = void> extends Error {
  extensions: Extensions;
  code: string;
  status: number;
}

/**
 * @publicApi
 */
export interface MezaErrorConstructor<Extensions = void> {
  new (extensions: Extensions, options?: ErrorOptions): MezaError<Extensions>;
  readonly prototype: MezaError<Extensions>;
}
