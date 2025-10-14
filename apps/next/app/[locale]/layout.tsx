import type { ReactNode } from "react";

import { TRPCProvider } from "@azem/router/provider";
import { App } from "@azem/ui";

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

async function Layout({ children, params }: Props) {
  const { locale } = await params;
  return (
    <App locale={locale}>
      <TRPCProvider>{children}</TRPCProvider>
    </App>
  );
}

export default Layout;
