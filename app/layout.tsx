
import './globals.css'

import Nav from './nav'
import AnalyticsWrapper from './analytics'
import Toast from './toast'
import Footer from './footer'
import { SessionProvider } from 'next-auth/react'
import { Suspense } from 'react'

export const metadata = {
  title: 'Don Menu',
  description: 'Don Menu é um sistema de cardápio digital para restaurantes, bares e lanchonetes.',
  url: 'https://donmenu.com.br',
  siteName: 'Don Menu',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full bg-gray-50">
      <body className="h-full">
        <SessionProvider>
          <Suspense fallback="...">
            {/* @ts-expect-error Server Component */}
            <Nav />
          </Suspense>
          {children}
          <AnalyticsWrapper />
          {/*<Toast />*/}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
