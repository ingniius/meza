import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createTV } from "tailwind-variants";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const tv = createTV({ twMerge: true });
