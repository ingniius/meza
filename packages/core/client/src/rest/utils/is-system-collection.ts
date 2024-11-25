/**
 * @internal
 */
export function isSystemCollection(collection: string): boolean {
  // @ts-expect-error actual values are injected at build time from the @azem/system package
  const collections: string[] = __SYSTEM_COLLECTION_NAMES__;
  return collections.includes(collection);
}
