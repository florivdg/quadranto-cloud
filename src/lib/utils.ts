import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function acceptLanguage(headers: Headers) {
  return headers.get('accept-language')?.split(',').at(0)
}
