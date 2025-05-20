import createNextIntlPlugin from 'next-intl/plugin'
import bundleAnalyzerPlugin from '@next/bundle-analyzer'
await import('./src/env.mjs')

const withNextIntl = createNextIntlPlugin()

const withBundleAnalyzer = bundleAnalyzerPlugin({
  enabled: process.env.BUNDLE_ANALYZER === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  }
}

export default withNextIntl(withBundleAnalyzer(nextConfig))
