/**
 * @publicApi
 * @name cssVar
 * @description Get the value of a globally registered CSS variable.
 * @param name
 * @param element
 */
export function cssVar(name: string, element: Element = document.body) {
  return getComputedStyle(element ?? document.body)
    .getPropertyValue(name)
    .trim();
}
