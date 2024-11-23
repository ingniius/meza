/**
 * @publicApi
 * @name isTypeIn
 */
export function isIn<T extends readonly string[]>(value: string, array: T): value is T[number] {
  return array.includes(value);
}

/**
 * @publicApi
 * @name isTypeIn
 */
export function isTypeIn<T extends { type?: string }, E extends string>(
  object: T,
  array: readonly E[],
): object is Extract<T, { type?: E }> {
  if (!object.type) return false;

  return (array as readonly string[]).includes(object.type);
}

/**
 * @publicApi
 * @name moveInArray
 */
export function moveInArray<T = any>(array: T[], fromIndex: number, toIndex: number): T[] {
  const item = array[fromIndex];
  const length = array.length;
  const diff = fromIndex - toIndex;

  if (item === undefined) return array;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, fromIndex),
      ...array.slice(fromIndex + 1, length),
    ];
  } else if (diff < 0) {
    // move right
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, fromIndex),
      ...array.slice(fromIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length),
    ];
  }

  return array;
}
