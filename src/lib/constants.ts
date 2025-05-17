import { env } from '@/env.mjs'

/** Node env production status flag */
export const IS_ENV_PRODUCTION = env.NODE_ENV === 'production'

/**
 * Site language configuration. Languages are identified by ISO 639 `set1` language codes.
 * @see {@link https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes} for the list of ISO 639 language codes
 */
export const LOCALES = [
  {
    name: 'English',
    set1: 'en',
    set2: 'eng',
    nlsLang: 'en_EU'
  },
  {
    name: 'Español',
    set1: 'es',
    set2: 'esp',
    nlsLang: 'es_ES'
  }
] as const

/**
 * Supported languages `set1` code type
 * @see {@link LOCALES} for the list of supported languages
 */
export type Locale = typeof LOCALES[number]['set1']
