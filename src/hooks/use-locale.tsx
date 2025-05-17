import { useLocale as useNextIntlLocale } from 'next-intl'
import { type Locale } from '@/lib/constants'

export function useLocale () {
  return useNextIntlLocale() as Locale
}
