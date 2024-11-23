import { ErrorCode } from "@azem/enums/code";
import type { Range } from "@azem/types/storage";

import { createError } from "../../create-error";

/**
 * @publicApi
 */
export interface RangeNotSatisfiableErrorExtensions {
  range: Range;
}

/**
 * @internal
 */
export const messageConstructor = ({ range }: RangeNotSatisfiableErrorExtensions) => {
  const rangeString = `"${range.start ?? ""}-${range.end ?? ""}"`;
  return `Range ${rangeString} is invalid or the file's size doesn't match the requested range.`;
};

/**
 * @publicApi
 * @name RangeNotSatisfiableError
 */
export const RangeNotSatisfiableError = createError<RangeNotSatisfiableErrorExtensions>(
  ErrorCode.RangeNotSatisfiable,
  messageConstructor,
  416,
);
