import type { MezaExtension } from "../../../schemas/extension";
import type { NestedPartial } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name updateExtension
 * @description Update an existing extension.
 * @param bundle - Bundle this extension is in
 * @param name - Unique name of the extension
 * @param data - Partial extension object
 */
export const updateExtension =
  <Schema>(
    bundle: string | null,
    name: string,
    data: NestedPartial<MezaExtension<Schema>>,
  ): RestCommand<MezaExtension<Schema>, Schema> =>
  () => {
    if (bundle !== null) throwIfEmpty(bundle, "Bundle cannot be an empty string");
    throwIfEmpty(name, "Name cannot be empty");

    return {
      path: bundle ? `/extensions/${bundle}/${name}` : `/extensions/${name}`,
      params: {},
      body: JSON.stringify(data),
      method: "PATCH",
    };
  };
