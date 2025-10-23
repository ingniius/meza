import type * as React from "react";

import { cn } from "../../lib/utils";

export interface ContainerProps extends React.ComponentProps<"div"> {}

function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-(--container) px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export { Container };
