/**
 * @publicApi
 * @name getAuthEndpoint
 * @param provider Use a specific authentication provider.
 */
export function getAuthEndpoint(provider?: string) {
  if (provider) return `/auth/login/${provider}`;
  return "/auth/login";
}
