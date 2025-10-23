import type * as React from "react";

import { cn } from "../../lib/utils";

export interface MainProps extends React.ComponentProps<"main"> {}

function Main({ className, ...props }: MainProps) {
  return <main className={cn("min-h-[calc(100vh-var(--header-height))] px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export { Main };
