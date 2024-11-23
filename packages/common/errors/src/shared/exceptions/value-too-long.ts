import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 */
export interface ValueTooLongErrorExtensions {
  collection: string | null;
  field: string | null;
}

/**
 * @internal
 */
export const messageConstructor = ({ collection, field }: ValueTooLongErrorExtensions) => {
  let message = "Value ";

  if (field) {
    message += `for field "${field}" `;
  }

  if (collection) {
    message += `in collection "${collection}" `;
  }

  message += `is too long.`;
  return message;
};

/**
 * @publicApi
 */
export const ValueTooLongError = createError<ValueTooLongErrorExtensions>(
  ErrorCode.ValueTooLong,
  messageConstructor,
  400,
);
