import type { ThemeProviderProps } from "next-themes";

import { fonts } from "./lib/fonts";
import { cn } from "./lib/utils";
import { ThemeProvider } from "./providers/theme";

type Props = ThemeProviderProps & { className?: any; locale?: string };

export function App({ children, className, locale = "en", ...properties }: Props) {
  return (
    <html className={cn(fonts, "scroll-smooth")} lang={locale} suppressHydrationWarning>
      <body className={cn(className)}>
        <ThemeProvider {...properties}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
