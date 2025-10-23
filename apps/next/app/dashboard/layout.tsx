import type { ReactNode } from "react";

import { App } from "@azem/ui";

interface LayoutProps {
  children: ReactNode;
}

async function Layout({ children }: LayoutProps) {
  return (
    <App locale="en">
      {children}
    </App>
  );
}

export default Layout;
