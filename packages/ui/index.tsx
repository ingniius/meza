import type { ThemeProviderProps } from "next-themes";

import { fonts } from "./lib/fonts";
import { cn } from "./lib/utils";
import { ThemeProvider } from "./providers/theme";

type Props = ThemeProviderProps & { locale: string };

export function App({ children, locale, ...properties }: Props) {
  return (
    <html className={cn(fonts, "scroll-smooth")} lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider {...properties}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
