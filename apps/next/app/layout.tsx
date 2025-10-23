import "./styles.css";

import type { Viewport } from "next";
import type { ReactNode } from "react";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

async function Layout({ children }: { children: ReactNode }) {
  return children;
}

export default Layout;
