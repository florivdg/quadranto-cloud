import { de } from './locales/de'
import { en, type Translations } from './locales/en'

export type Locale = 'en' | 'de'

export const SUPPORTED_LOCALES: Locale[] = ['en', 'de']
export const DEFAULT_LOCALE: Locale = 'en'

const translations: Record<Locale, Translations> = {
  en,
  de,
}

/**
 * Get translations for a given locale.
 */
export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations[DEFAULT_LOCALE]
}

/**
 * Create a translator function for a given locale.
 */
export function createTranslator(locale: Locale) {
  const t = getTranslations(locale)
  return t
}

/**
 * Check if a locale is supported.
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale)
}

/**
 * Detect locale from Accept-Language header.
 */
export function detectLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE

  // Parse Accept-Language header and find first supported locale
  const languages = acceptLanguage.split(',').map((lang) => {
    const [code] = lang.trim().split(';')
    return code.split('-')[0].toLowerCase()
  })

  for (const lang of languages) {
    if (isValidLocale(lang)) {
      return lang
    }
  }

  return DEFAULT_LOCALE
}

/**
 * Cookie name for locale preference.
 */
export const LOCALE_COOKIE_NAME = 'locale'

/**
 * Get locale on the client side.
 * Checks cookie first, then falls back to browser language.
 * Only call this in browser context.
 */
export function getClientLocale(): Locale {
  // Check cookie
  const stored = getLocaleCookie()
  if (stored && isValidLocale(stored)) return stored

  // Fall back to browser language
  const browserLang = navigator.language.split('-')[0]
  if (isValidLocale(browserLang)) return browserLang

  return DEFAULT_LOCALE
}

/**
 * Save locale preference to cookie.
 * Only call this in browser context.
 */
export function setClientLocale(locale: Locale): void {
  // Set cookie with 1 year expiry, SameSite=Lax for security
  const maxAge = 365 * 24 * 60 * 60 // 1 year in seconds
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`
}

/**
 * Clear locale preference cookie.
 * This will cause getClientLocale to fall back to browser language.
 * Only call this in browser context.
 */
export function clearClientLocale(): void {
  // Delete cookie by setting max-age to 0
  document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`
}

/**
 * Check if a locale preference is stored in cookie.
 * Only call this in browser context.
 */
export function hasStoredLocale(): boolean {
  return getLocaleCookie() !== null
}

/**
 * Get the locale cookie value.
 * Only call this in browser context.
 */
function getLocaleCookie(): string | null {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === LOCALE_COOKIE_NAME) {
      return value || null
    }
  }
  return null
}

/**
 * Get the browser's preferred locale.
 * Only call this in browser context.
 */
export function getBrowserLocale(): Locale {
  // Guard against SSR where navigator or navigator.language may not exist
  if (typeof navigator === 'undefined' || !navigator.language) {
    return DEFAULT_LOCALE
  }
  const browserLang = navigator.language.split('-')[0]
  if (isValidLocale(browserLang)) return browserLang
  return DEFAULT_LOCALE
}

export { en, de, type Translations }
