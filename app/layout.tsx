import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { PostHogProvider } from '@/app/providers'

const ibmPlexMono = IBM_Plex_Mono({ weight: "500", subsets: ['latin'] })

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
      <body className={ibmPlexMono.className}>
        <PostHogProvider>
          <main className="flex min-h-screen flex-col items-center p-6 md:p-10">
            <div className="flex flex-col max-w-3xl">
              {children}
            </div>
          </main>
          </PostHogProvider>
      </body>
    </html>
  )
}
