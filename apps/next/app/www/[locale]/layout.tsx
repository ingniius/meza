import type { ReactNode } from "react";

import { App } from "@azem/ui";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params;
  return (
    <App locale={locale}>
      {children}
    </App>
  );
}

export default Layout;
