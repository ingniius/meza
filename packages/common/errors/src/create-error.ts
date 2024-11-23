import { str } from "@azem/utils/assertion";

import type { MezaError, MezaErrorConstructor } from "./types";

/**
 * @publicApi
 * @name createError
 * @param code
 * @param message
 * @param status
 */
export const createError = <Extensions = void>(
  code: string,
  message: string | ((extensions: Extensions) => string),
  status = 500,
): MezaErrorConstructor<Extensions> => {
  return class extends Error implements MezaError<Extensions> {
    override name = "MezaError";
    extensions: Extensions;
    code = code.toUpperCase();
    status = status;

    constructor(extensions: Extensions, options?: ErrorOptions) {
      const msg = str(message) ? message : message(extensions as Extensions);
      super(msg, options);
      this.extensions = extensions;
    }

    override toString() {
      return `${this.name} [${this.code}]: ${this.message}`;
    }
  };
};
