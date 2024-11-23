/**
 * @publicApi
 */
export type Accountability = {
  role: string | null;
  roles: string[];
  user: string | null;
  admin: boolean;
  app: boolean;
  share?: string;
  ip: string | null;
  userAgent?: string;
  origin?: string;
};

/**
 * @publicApi
 */
export type ShareScope = {
  collection: string;
  item: string;
};
