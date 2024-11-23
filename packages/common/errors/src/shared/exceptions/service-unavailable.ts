import { ErrorCode } from "@azem/enums/code";

import { createError } from "../../create-error";

/**
 * @publicApi
 */
export interface ServiceUnavailableErrorExtensions {
  service: string;
  reason: string;
}

/**
 * @internal
 */
export const messageConstructor = ({ service, reason }: ServiceUnavailableErrorExtensions) =>
  `Service "${service}" is unavailable. ${reason}.`;

/**
 * @publicApi
 * @name ServiceUnavailableError
 */
export const ServiceUnavailableError = createError<ServiceUnavailableErrorExtensions>(
  ErrorCode.ServiceUnavailable,
  messageConstructor,
  503,
);
