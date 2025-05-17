import { routing } from '@/i18n/routing'
import { getRequestConfig } from 'next-intl/server'
import { type Locale } from '@/lib/constants'

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`@/assets/locale/${locale}.json`)).default
  }
})
