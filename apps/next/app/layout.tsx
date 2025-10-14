import "./styles.css";

import type { Viewport } from "next";
import type { ReactNode } from "react";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface Props {
  children: ReactNode;
}

async function Layout({ children }: Props) {
  return children;
}

export default Layout;
