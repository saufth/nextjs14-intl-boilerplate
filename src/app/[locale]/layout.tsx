import { type Metadata, type Viewport } from 'next'
import { notFound } from 'next/navigation'
import { env } from '@/env.mjs'
import { routing } from '@/i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import type { LayoutWithLocaleProps, LocaleParams } from '@/types'
import { siteConfig } from '@/config/site'
import { LOCALES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { fontHeader, fontSans } from '@/lib/fonts'
import { Toaster } from '@/components/ui/sonner'
import GoogleSearchScript from '@/components/layouts/google-seacrch-script'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/providers'
import '@/app/globals.css'

export async function generateMetadata ({ params: { locale } }: LocaleParams) {
  const t = await getTranslations({ locale, namespace: 'SiteMeta' })
  const defaultLocale = LOCALES.find((localeItem) => localeItem.set1 === locale) || LOCALES[0]

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: {
      default: siteConfig.name,
      template: `${siteConfig.name} — %s`
    },
    description: t('description'),
    keywords: [
      'nextjs 14 intl boilerplate',
      'next-intl'
    ],
    authors: siteConfig.author,
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    applicationName: siteConfig.name,
    generator: 'Next.js',
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      locale: defaultLocale.nlsLang,
      alternateLocale: LOCALES.map((localeItem) => localeItem.nlsLang)
        .filter((nlsLangItem) => nlsLangItem !== defaultLocale.nlsLang),
      url: siteConfig.url,
      title: siteConfig.name,
      description: t('description'),
      images: [`${siteConfig.url}/opengraph-image.jpg`],
      siteName: siteConfig.name
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: t('description'),
      images: [`${siteConfig.url}/opengraph-image.jpg`],
      creator: '@saufth'
    }
  } satisfies Metadata
}

export const viewport: Viewport = {
  width: 'device-width',
  userScalable: true,
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

export default async function RootLayout ({
  children,
  params: { locale }
}: LayoutWithLocaleProps) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound()
  }

  // Providing all messages to the client
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={cn(
          'bg-background text-foreground font-sans min-h-screen !scroll-smooth',
          fontHeader.variable,
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
          >
            {children}
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </NextIntlClientProvider>
        <GoogleSearchScript />
      </body>
    </html>
  )
}
