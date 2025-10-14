import type { ReactNode } from "react";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@azem/auth/server";
import { TRPCProvider } from "@azem/router/provider";
import { App } from "@azem/ui";

interface Props {
  children: ReactNode;
}

async function Layout({ children }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/dashboard");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("Next-Locale")?.value || "en";

  return (
    <App locale={locale}>
      <TRPCProvider>{children}</TRPCProvider>
    </App>
  );
}

export default Layout;
