import { str } from "@azem/utils/assertion";

/**
 * @publicApi
 * @name isDynamicVariable
 * @param value
 */
export function isDynamicVariable(value: any) {
  return (
    str(value) &&
    ["$NOW", "$CURRENT_USER", "$CURRENT_ROLE", "$CURRENT_ROLES", "$CURRENT_POLICIES"].some((prefix) =>
      value.startsWith(prefix),
    )
  );
}
