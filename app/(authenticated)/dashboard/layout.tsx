export const metadata = {
    title: 'Don Menu',
    description:
      'Don Menu é um sistema de cardápio digital para restaurantes, bares e lanchonetes.'
  };
  
  import Sidebar from './sidebar' // (vamos criar já já)
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-10">
          {children}
        </main>
      </div>
    )
  }
  