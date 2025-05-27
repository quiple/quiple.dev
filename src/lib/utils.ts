import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const unicodeTitleCase = (e: string) =>
  e
    .replaceAll(/(?<=\W*)Cjk(?=\W*)/g, 'CJK')
    .replaceAll(/(?<=\W*)up(?=\W*)/g, 'Up')
    .replace(/-[0-9A-Fa-f]{4,5}$/, (e) => e.toUpperCase())
