import { Card, Title, Text, Button } from '@tremor/react'
import { 
  PlusIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  QrCodeIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

const quickActions = [
  {
    title: 'Novo Pedido',
    description: 'Registrar um novo pedido',
    icon: PlusIcon,
    href: '/dashboard/pedidos',
    color: 'bg-blue-500 hover:bg-blue-600',
    textColor: 'text-blue-600'
  },
  {
    title: 'Adicionar Prato',
    description: 'Criar novo item no cardápio',
    icon: PlusIcon,
    href: '/dashboard/cardapio/add-cardapio',
    color: 'bg-green-500 hover:bg-green-600',
    textColor: 'text-green-600'
  },
  {
    title: 'Ficha Técnica',
    description: 'Gerenciar receitas e custos',
    icon: ClipboardDocumentListIcon,
    href: '/dashboard/ficha-tecnica',
    color: 'bg-purple-500 hover:bg-purple-600',
    textColor: 'text-purple-600'
  },
  {
    title: 'Análise CMV',
    description: 'Visualizar custos e lucros',
    icon: ChartBarIcon,
    href: '/dashboard/cmv',
    color: 'bg-orange-500 hover:bg-orange-600',
    textColor: 'text-orange-600'
  },
  {
    title: 'QR Code',
    description: 'Gerar QR code do cardápio',
    icon: QrCodeIcon,
    href: '/dashboard/qr-code',
    color: 'bg-indigo-500 hover:bg-indigo-600',
    textColor: 'text-indigo-600'
  },
  {
    title: 'Financeiro',
    description: 'Gestão financeira',
    icon: CurrencyDollarIcon,
    href: '/dashboard/financeiro',
    color: 'bg-emerald-500 hover:bg-emerald-600',
    textColor: 'text-emerald-600'
  },
  {
    title: 'Pedidos',
    description: 'Ver todos os pedidos',
    icon: ShoppingCartIcon,
    href: '/dashboard/pedidos',
    color: 'bg-pink-500 hover:bg-pink-600',
    textColor: 'text-pink-600'
  },
  {
    title: 'Usuários',
    description: 'Gerenciar equipe',
    icon: UserGroupIcon,
    href: '/dashboard/users',
    color: 'bg-teal-500 hover:bg-teal-600',
    textColor: 'text-teal-600'
  },
  {
    title: 'Configurações',
    description: 'Ajustes do sistema',
    icon: CogIcon,
    href: '/dashboard/settings',
    color: 'bg-gray-500 hover:bg-gray-600',
    textColor: 'text-gray-600'
  }
]

export default function QuickActions() {
  const router = useRouter()

  return (
    <Card className="mb-8 p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-sm">
      <div className="mb-6">
        <Title className="text-xl font-semibold text-gray-800 mb-2">
          🚀 Ações Rápidas
        </Title>
        <Text className="text-gray-600">
          Acesse rapidamente as funcionalidades mais usadas do seu restaurante
        </Text>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => router.push(action.href)}
            className="group p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`p-3 rounded-full ${action.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div>
                <Text className="font-medium text-gray-800 group-hover:text-gray-900">
                  {action.title}
                </Text>
                <Text className="text-xs text-gray-500 mt-1">
                  {action.description}
                </Text>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Dicas do dia */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <span className="text-blue-600 text-sm font-bold">💡</span>
            </div>
            <div>
              <Text className="font-medium text-blue-800 mb-1">
                Dica do Dia
              </Text>
              <Text className="text-sm text-blue-700">
                Mantenha suas fichas técnicas sempre atualizadas para ter controle preciso dos custos e lucros dos seus pratos.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
} 