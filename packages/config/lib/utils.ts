import type { NextRequest } from "next/server";

export function parse(req: NextRequest) {
  let domain = req.headers.get("host") as string;
  // path is the path of the URL (e.g. azem.tech/stats/github -> /stats/github)
  const path = req.nextUrl.pathname;
  // remove www. from domain and convert to lowercase
  domain = domain.replace(/^www./, "").toLowerCase();
  if (domain === "hub.localhost:3000" || domain.endsWith(".vercel.app")) {
    domain = process.env.NEXT_PUBLIC_DOMAIN!;
  }

  // fullPath is the full URL path (along with search params)
  const searchParams = req.nextUrl.searchParams.toString();
  const searchParamsObj = Object.fromEntries(req.nextUrl.searchParams);
  const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : "";
  const fullPath = `${path}${searchParamsString}`;

  // Here, we are using decodeURIComponent to handle foreign languages like Hebrew
  const key = decodeURIComponent(path.split("/")[1]);
  const fullKey = decodeURIComponent(path.slice(1));

  return {
    domain,
    path,
    fullPath,
    key,
    fullKey,
    shortLink: `https://${domain}/${fullKey}`,
    searchParamsObj,
    searchParamsString,
  };
}

export function withLocalAliases(hosts: string[]): string[] {
  const variants = new Set<string>();

  for (const host of hosts) {
    variants.add(host);

    for (const alias of ["0.0.0.0", "127.0.0.1"]) {
      if (host.includes("localhost")) {
        variants.add(host.replace("localhost", alias));
      }
    }
  }

  return Array.from(variants);
}
