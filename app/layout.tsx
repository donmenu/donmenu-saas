import './globals.css'

import Nav from './nav'
import AnalyticsWrapper from './analytics'
import Toast from './toast'
import Footer from './footer'
import { Suspense } from 'react'
import SessionProviderWrapper from './session-provider'
import { ThemeProvider } from '../lib/contexts/ThemeContext'

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
    <html lang="pt-BR" className="h-full">
      <body className="h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <ThemeProvider>
          <SessionProviderWrapper>
            <Suspense fallback="...">
              <Nav />
            </Suspense>
            {children}
            <AnalyticsWrapper />
            {/*<Toast />*/}
            <Footer />
          </SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
