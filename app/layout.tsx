import './globals.css'
import { Inter } from 'next/font/google'
import  Analytics  from './analytics'
import SessionProvider from './session-provider'
import { ThemeProvider } from '../lib/contexts/ThemeContext'
import Navbar from './navbar'
import Footer from './footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Don Menu - Gestão Inteligente para Restaurantes',
  description: 'O Don Menu é um sistema de gestão completo para restaurantes, bares e lanchonetes. Oferecemos cardápio digital com QR code, ficha técnica, gestão de insumos e muito mais.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <SessionProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Analytics />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
