import type { FieldMeta, RawField } from "@azem/types/field";

/**
 * @publicApi
 * @name addFieldFlag
 * @description Add a flag to a field.
 */
export function addFieldFlag(field: RawField, flag: string) {
  if (!field.meta) {
    field.meta = { special: [flag] } as FieldMeta;
  } else if (!field.meta.special) {
    field.meta.special = [flag];
  } else if (!field.meta.special.includes(flag)) {
    field.meta.special.push(flag);
  }
}
