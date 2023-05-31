import './globals.css';

import Nav from './nav';
import AnalyticsWrapper from './analytics';
import Toast from './toast';
import Footer from './footer';
import { Suspense } from 'react';
import ToggleDarkMode from './(components)/toogleDarkMode';

export const metadata = {
  title: 'Don Menu',
  description:
    'Don Menu é um sistema de cardápio digital para restaurantes, bares e lanchonetes.',
  url: 'https://donmenu.com.br',
  siteName: 'Don Menu'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        {children}
        <AnalyticsWrapper />
        {/*<Toast />*/}
        <Footer/>
      </body>
    </html>
  );
}
