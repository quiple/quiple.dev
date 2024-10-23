import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const fonts = ['14', '11', '11 Bold', '11 Condensed', '9', '7', 'Mono11', 'Mono9', 'Mono7']

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
