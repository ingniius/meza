/**
 * @publicApi
 */
export interface EmailAuth {
  email: string;
  password: string;
  uid?: string;
}

/**
 * @publicApi
 */
export interface TokenAuth {
  access_token: string;
  uid?: string;
}

/**
 * @publicApi
 */
export interface RefreshAuth {
  refresh_token: string;
  uid?: string;
}

/**
 * @publicApi
 * @name auth
 */
export function auth(creds: EmailAuth | TokenAuth | RefreshAuth) {
  return JSON.stringify({ ...creds, type: "auth" });
}
