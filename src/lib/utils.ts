import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const unicodeTitleCase = (e: string) =>
  e.replaceAll('Cjk', 'CJK').replace(/-[0-9A-Fa-f]{4}$/, (e) => e.toUpperCase())
