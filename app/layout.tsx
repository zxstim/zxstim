import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZxStim',
  description: 'Building and shipping software products',
  metadataBase: new URL('https://www.zxstim.com'),
  openGraph: {
    title: 'ZxStim',
    description: 'Building and shipping software products',
    url: 'https://www.zxstim.com',
    siteName: 'ZxStim',
    images: [
      {
        url: '/zxstim-tbn.png',
        width: 1200,
        height: 630,
        alt: 'og-image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZxStim',
    description: 'Building and shipping software products',
    creator: '@0xstim',
    images: ['/zxstim-tbn.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script defer data-domain="zxstim.com" src="https://analytics.pyhash.com/js/script.js"></Script>
        <main className="flex min-h-screen flex-col items-center p-6 md:p-10 bg-muted">
          <div className="flex flex-col max-w-5xl w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
