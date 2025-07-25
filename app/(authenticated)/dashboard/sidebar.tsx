'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  HomeIcon, 
  Bars3Icon, 
  UserGroupIcon, 
  CubeIcon, 
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  QrCodeIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Restaurantes', href: '/dashboard/restaurants', icon: BuildingStorefrontIcon },
  { name: 'Cardápios', href: '/dashboard/cardapio', icon: Bars3Icon },
  { name: 'Insumos', href: '/dashboard/supplies', icon: CubeIcon },
  { name: 'Fichas Técnicas', href: '/dashboard/ficha-tecnica', icon: ClipboardDocumentListIcon },
  { name: 'Usuários', href: '/dashboard/users', icon: UserGroupIcon },
  { name: 'Pedidos', href: '/dashboard/pedidos', icon: ShoppingCartIcon },
  { name: 'QR Code', href: '/dashboard/qr-code', icon: QrCodeIcon },
  { 
    name: 'Financeiro', 
    href: '/dashboard/financeiro', 
    icon: CurrencyDollarIcon,
    subItems: [
      { name: 'Visão Geral', href: '/dashboard/financeiro', icon: CurrencyDollarIcon },
      { name: 'Caixa', href: '/dashboard/financeiro/caixa', icon: BanknotesIcon },
      { name: 'Receitas', href: '/dashboard/financeiro/receitas', icon: ArrowUpIcon },
      { name: 'Despesas', href: '/dashboard/financeiro/despesas', icon: ArrowDownIcon },
      { name: 'Relatórios', href: '/dashboard/financeiro/relatorios', icon: ChartBarIcon },
    ]
  },
  { name: 'CMV', href: '/dashboard/cmv', icon: ChartBarIcon },
  { name: 'Assinatura', href: '/dashboard/assinatura', icon: CreditCardIcon },
  { name: 'Configurações', href: '/dashboard/settings', icon: HomeIcon },
]

export default function Sidebar({ collapsed, onExpand, onCollapse }: { collapsed: boolean, onExpand: () => void, onCollapse: () => void }) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const handleMouseEnter = () => onExpand()
  const handleMouseLeave = () => onCollapse()

  const toggleCollapsed = () => collapsed ? onExpand() : onCollapse()

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  const isSubItemActive = (href: string) => {
    if (!pathname) return false
    return pathname === href
  }

  return (
    <div 
      className={`
        fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out z-50
        ${collapsed ? 'w-16' : 'w-64'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">Don Menu</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleCollapsed}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isItemActive = isActive(item.href)
          const hasSubItems = item.subItems && item.subItems.length > 0
          const isExpanded = expandedItems.includes(item.name)

          return (
            <div key={item.name}>
              {hasSubItems ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      isItemActive 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700' 
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span className="font-medium">{item.name}</span>}
                    </div>
                    {!collapsed && (
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  
                  {isExpanded && !collapsed && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.subItems!.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                            isSubItemActive(subItem.href)
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isItemActive 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {!collapsed && <span className="font-medium">{item.name}</span>}
                </Link>
              )}
            </div>
          )
        })}
      </nav>

      {/* User section */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Usuário</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@donmenu.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
