'use client'

import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  if (!isDashboard) return null

  return (
    <aside className="hidden sm:flex w-64 bg-gray-800 text-white flex-col shadow-lg">
      <nav className="flex-1 px-6 py-8 space-y-4">
        <ul className="space-y-4">
          <li>
            <a href="/dashboard/cardapio" className="block text-sm hover:text-purple-400">Cardápios</a>
          </li>
          <li>
            <a href="/dashboard/supplies" className="block text-sm hover:text-purple-400">Insumos</a>
          </li>
          <li>
            <a href="/dashboard/supplies" className="block text-sm hover:text-purple-400">Fichas técnicas</a>
          </li>
          <li>
            <a href="/dashboard/supplies" className="block text-sm hover:text-purple-400">Delivery</a>
          </li>
          <li>
            <a href="/dashboard/supplies" className="block text-sm hover:text-purple-400">Promoções</a>
          </li>
          <li>
            <a href="/dashboard/supplies" className="block text-sm hover:text-purple-400">Pedidos</a>
          </li>
          <li>
            <a href="/dashboard/users" className="block text-sm hover:text-purple-400">Usuários</a>
          </li>
          <li>
            <a href="/dashboard/settings" className="block text-sm hover:text-purple-400">Configurações</a>
          </li>
        </ul>
      </nav>
      <div className="px-6 pb-6">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full px-3 py-2 text-sm text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </aside>
  )
}
