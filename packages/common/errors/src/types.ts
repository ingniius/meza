import { ErrorCode } from "@azem/enums/code";

import type { ContainsNullValuesErrorExtensions } from "./exceptions/contains-null-values";
import type { HitRateLimitErrorExtensions } from "./exceptions/hit-rate-limit";
import type { IllegalAssetTransformationErrorExtensions } from "./exceptions/illegal-asset-transformation";
import type { InvalidForeignKeyErrorExtensions } from "./exceptions/invalid-foreign-key";
import type { InvalidPayloadErrorExtensions } from "./exceptions/invalid-payload";
import type { InvalidProviderConfigErrorExtensions } from "./exceptions/invalid-provider-config";
import type { InvalidQueryErrorExtensions } from "./exceptions/invalid-query";
import type { MethodNotAllowedErrorExtensions } from "./exceptions/method-not-allowed";
import type { NotNullViolationErrorExtensions } from "./exceptions/not-null-violation";
import type { RangeNotSatisfiableErrorExtensions } from "./exceptions/range-not-satisfiable";
import type { RecordNotUniqueErrorExtensions } from "./exceptions/record-not-unique";
import type { RouteNotFoundErrorExtensions } from "./exceptions/route-not-found";
import type { ServiceUnavailableErrorExtensions } from "./exceptions/service-unavailable";
import type { UnprocessableContentErrorExtensions } from "./exceptions/unprocessable-content";
import type { UnsupportedMediaTypeErrorExtensions } from "./exceptions/unsupported-media-type";
import type { ValueOutOfRangeErrorExtensions } from "./exceptions/value-out-of-range";
import type { ValueTooLongErrorExtensions } from "./exceptions/value-too-long";

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

/** Map error codes to error extensions. */
export type ExtensionsMap = {
  [code in ErrorCode]: code extends keyof Map ? Map[code] : never;
};
