import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 */
export interface ValueOutOfRangeErrorExtensions {
  collection: string | null;
  field: string | null;
}

/**
 * @internal
 */
export const messageConstructor = ({ collection, field }: ValueOutOfRangeErrorExtensions) => {
  let message = "Numeric value ";

  if (field) {
    message += `for field "${field}" `;
  }

  if (collection) {
    message += `in collection "${collection}" `;
  }

  message += `is out of range.`;

  return message;
};

/**
 * @publicApi
 * @name ValueOutOfRangeError
 */
export const ValueOutOfRangeError = createError<ValueOutOfRangeErrorExtensions>(
  ErrorCode.ValueOutOfRange,
  messageConstructor,
  400,
);
