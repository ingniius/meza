import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 */
export interface NotNullViolationErrorExtensions {
  collection: string | null;
  field: string | null;
}

/**
 * @internal
 */
export const messageConstructor = ({ collection, field }: NotNullViolationErrorExtensions) => {
  let message = "Value ";

  if (field) {
    message += `for field "${field}" `;
  }

  if (collection) {
    message += `in collection "${collection}" `;
  }

  message += `can't be null.`;
  return message;
};

/**
 * @publicApi
 * @name NotNullViolationError
 */
export const NotNullViolationError = createError<NotNullViolationErrorExtensions>(
  ErrorCode.NotNullViolation,
  messageConstructor,
  400,
);
