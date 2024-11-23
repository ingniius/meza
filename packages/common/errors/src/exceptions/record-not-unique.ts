import { ErrorCode } from "@azem/enums/code";

import { createError } from "../create-error";

/**
 * @publicApi
 */
export interface RecordNotUniqueErrorExtensions {
  collection: string | null;
  field: string | null;
  primaryKey?: boolean;
}

/**
 * @publicApi
 */
export const messageConstructor = ({ collection, field }: RecordNotUniqueErrorExtensions) => {
  let message = "Value ";

  if (field) {
    message += `for field "${field}" `;
  }

  if (collection) {
    message += `in collection "${collection}" `;
  }

  message += `has to be unique.`;

  return message;
};

/**
 * @publicApi
 * @name RecordNotUniqueError
 */
export const RecordNotUniqueError = createError<RecordNotUniqueErrorExtensions>(
  ErrorCode.RecordNotUnique,
  messageConstructor,
  400,
);
