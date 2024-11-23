import { str } from "@azem/utils/assertion";

/**
 * @publicApi
 */
export interface MezaError<Extensions = void> extends Error {
  extensions: Extensions;
  code: string;
  status: number;
}

/**
 * @publicApi
 */
export interface MezaErrorConstructor<Extensions = void> {
  new (extensions: Extensions, options?: ErrorOptions): MezaError<Extensions>;
  readonly prototype: MezaError<Extensions>;
}

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
