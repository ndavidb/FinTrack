import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {format} from "date-fns/format";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
