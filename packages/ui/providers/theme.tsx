import type { ThemeProviderProps } from "next-themes";

import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children, ...properties }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      {...properties}
    >
      {children}
    </NextThemeProvider>
  );
}
