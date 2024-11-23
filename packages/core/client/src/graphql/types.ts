/**
 * @publicApi
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GraphqlClient<_Schema> {
  query<Output extends object = Record<string, any>>(
    query: string,
    variables?: Record<string, unknown>,
    scope?: "items" | "system",
  ): Promise<Output>;
}

/**
 * @publicApi
 */
export interface GraphqlConfig {
  credentials?: RequestCredentials;
}

/**
 * @publicApi
 * @description These utility types do not have schema fallback logic.
 */
export type GqlResult<Schema extends object, Collection extends keyof Schema> = {
  [Key in Collection]: Schema[Collection][];
};

/**
 * @publicApi
 */
export type GqlSingletonResult<Schema extends object, Collection extends keyof Schema> = {
  [Key in Collection]: Schema[Collection];
};
