import type { FieldFilter, Filter } from "@azem/types/filter";
import type { Dict } from "@azem/types/util";
import { flatten } from "@azem/utils/lodash";

import type Joi from "joi";

import type { JoiOptions } from "./generate-joi";
import { generateJoi } from "./generate-joi";
import { injectFunctionResults } from "./inject-function-results";

/**
 * @publicApi
 * @name validatePayload
 * @description Validate the payload against the given filter rules.
 * @param filter - The filter rules to check against
 * @param payload - The payload to validate
 * @param options - Optional options to pass to Joi
 */
export function validatePayload(filter: Filter, payload: Dict, options?: JoiOptions): Joi.ValidationError[] {
  const errors: Joi.ValidationError[] = [];

  /**
   * @NOTE there can only be a single _and / _or per level
   */
  if (Object.keys(filter)[0] === "_and") {
    const subValidation = Object.values(filter)[0] as FieldFilter[];

    const nestedErrors = flatten<Joi.ValidationError>(
      subValidation.map((subObj: Dict) => {
        return validatePayload(subObj, payload, options);
      }),
    ).filter((err?: Joi.ValidationError) => err);

    errors.push(...nestedErrors);
  } else if (Object.keys(filter)[0] === "_or") {
    const subValidation = Object.values(filter)[0] as FieldFilter[];

    const swallowErrors: Joi.ValidationError[] = [];

    const pass = subValidation.some((subObj: Dict) => {
      const nestedErrors = validatePayload(subObj, payload, options);

      if (nestedErrors.length > 0) {
        swallowErrors.push(...nestedErrors);
        return false;
      }

      return true;
    });

    if (!pass) {
      errors.push(...swallowErrors);
    }
  } else {
    const payloadWithFunctions = injectFunctionResults(payload, filter);
    const schema = generateJoi(filter as FieldFilter, options);

    const { error } = schema.validate(payloadWithFunctions, { abortEarly: false });

    if (error) {
      errors.push(error);
    }
  }

  return errors;
}
