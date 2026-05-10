import { Inter } from 'next/font/google'

import './globals.css'
 
const inter = Inter({ subsets: ['latin'] })
 
export const metadata = {
  title: {
    default: 'SignatureForge — AI Email Signature Generator | One-Time Price',
    template: '%s | SignatureForge',
  },
  description:
    'Create a professional email signature in 60 seconds. LinkedIn auto-import, ' +
    'brand color detection, Outlook-safe HTML. $14 one-time — no subscription.',
  metadataBase: new URL('https://www.signature-forge.com'),
  openGraph: {
    title: 'SignatureForge — AI Email Signature Generator',
    description: 'Professional signatures in 60 seconds. Outlook-safe. One-time $14.',
    url: 'https://www.signature-forge.com',
    siteName: 'SignatureForge',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SignatureForge — AI Email Signature Generator',
    description: 'Professional signatures in 60 seconds. Outlook-safe. One-time $14.',
    images: ['/og-image.png'],
  },
}
 
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
 
        {/* Plausible Analytics — replace with GA4 script if preferred */}
        {process.env.NODE_ENV === 'production' && (
          <script
            defer
            data-domain='signature-forge.com'
            src='https://plausible.io/js/script.js'
          />
        )}
      </body>
    </html>
  )
}

