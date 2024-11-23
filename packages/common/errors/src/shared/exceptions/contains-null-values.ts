import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 */
export interface ContainsNullValuesErrorExtensions {
  collection: string;
  field: string;
}

/**
 * @internal
 */
export const messageConstructor = ({ collection, field }: ContainsNullValuesErrorExtensions) =>
  `Field "${field}" in collection "${collection}" contains null values.`;

/**
 * @publicApi
 * @name ContainsNullValuesError
 */
export const ContainsNullValuesError = createError<ContainsNullValuesErrorExtensions>(
  ErrorCode.ContainsNullValues,
  messageConstructor,
  400,
);
