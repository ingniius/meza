import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 */
export interface InvalidForeignKeyErrorExtensions {
  collection: string | null;
  field: string | null;
}

/**
 * @internal
 */
export const messageConstructor = ({ collection, field }: InvalidForeignKeyErrorExtensions) => {
  let message = "Invalid foreign key";

  if (field) {
    message += ` for field "${field}"`;
  }

  if (collection) {
    message += ` in collection "${collection}"`;
  }

  message += `.`;
  return message;
};

/**
 * @publicApi
 * @name InvalidForeignKeyError
 */
export const InvalidForeignKeyError = createError<InvalidForeignKeyErrorExtensions>(
  ErrorCode.InvalidForeignKey,
  messageConstructor,
  400,
);
