'use client'

import { useState } from 'react'
import { Card, Title, Text, Badge, Button } from '@tremor/react'
import DevelopmentStats from './stats'
import { 
  CheckCircleIcon, 
  ClockIcon, 
  SparklesIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  StarIcon,
  FireIcon,
  ArrowTrendingUpIcon,
  CogIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  QrCodeIcon,
  ClipboardDocumentListIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  BeakerIcon,
  HeartIcon,
  GiftIcon,
  TruckIcon,
  CreditCardIcon,
  CubeIcon
} from '@heroicons/react/24/outline'

interface Feature {
  id: string
  title: string
  description: string
  status: 'released' | 'beta' | 'development' | 'planned' | 'idea'
  priority: 'high' | 'medium' | 'low'
  category: string
  icon: any
  color: string
  bgColor: string
  releaseDate?: string
  progress?: number
  dependencies?: string[]
}

const features: Feature[] = [
  // FUNCIONALIDADES ATUAIS (RELEASED)
  {
    id: 'dashboard',
    title: 'Dashboard Principal',
    description: 'Visão geral completa do seu restaurante com métricas em tempo real',
    status: 'released',
    priority: 'high',
    category: 'Core',
    icon: ChartBarIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    releaseDate: '2024-01-01'
  },
  {
    id: 'ingredients',
    title: 'Gestão de Insumos',
    description: 'Cadastro e controle completo de ingredientes e estoque',
    status: 'released',
    priority: 'high',
    category: 'Core',
    icon: CogIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    releaseDate: '2024-01-01'
  },
  {
    id: 'menu',
    title: 'Gestão de Cardápio',
    description: 'Criação e gerenciamento de itens do menu',
    status: 'released',
    priority: 'high',
    category: 'Core',
    icon: ClipboardDocumentListIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    releaseDate: '2024-01-01'
  },
  {
    id: 'recipes',
    title: 'Fichas Técnicas',
    description: 'Controle de receitas e custos dos pratos',
    status: 'released',
    priority: 'high',
    category: 'Core',
    icon: BeakerIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    releaseDate: '2024-01-01'
  },
  {
    id: 'cmv',
    title: 'Análise CMV',
    description: 'Cálculo e análise do custo das mercadorias vendidas',
    status: 'released',
    priority: 'high',
    category: 'Financeiro',
    icon: ArrowTrendingUpIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    releaseDate: '2024-01-01'
  },
  {
    id: 'orders',
    title: 'Gestão de Pedidos',
    description: 'Sistema completo de pedidos e vendas',
    status: 'released',
    priority: 'high',
    category: 'Vendas',
    icon: ShoppingCartIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    releaseDate: '2024-01-01'
  },
  {
    id: 'qr-code',
    title: 'QR Code do Cardápio',
    description: 'Geração de QR codes para acesso ao cardápio digital',
    status: 'released',
    priority: 'medium',
    category: 'Digital',
    icon: QrCodeIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    releaseDate: '2024-01-01'
  },
  {
    id: 'finance',
    title: 'Sistema Financeiro',
    description: 'Controle de receitas, despesas e relatórios financeiros',
    status: 'released',
    priority: 'high',
    category: 'Financeiro',
    icon: CurrencyDollarIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    releaseDate: '2024-01-01'
  },
  {
    id: 'users',
    title: 'Gestão de Usuários',
    description: 'Controle de acesso e permissões da equipe',
    status: 'released',
    priority: 'medium',
    category: 'Admin',
    icon: UserGroupIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    releaseDate: '2024-01-01'
  },
  {
    id: 'restaurants',
    title: 'Gestão de Restaurantes',
    description: 'Configuração e administração de restaurantes',
    status: 'released',
    priority: 'high',
    category: 'Core',
    icon: BuildingStorefrontIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    releaseDate: '2024-01-01'
  },
  {
    id: 'profile',
    title: 'Perfil do Usuário',
    description: 'Gerenciamento de dados pessoais e configurações',
    status: 'released',
    priority: 'medium',
    category: 'Admin',
    icon: UserGroupIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    releaseDate: '2024-07-25'
  },

  // FUNCIONALIDADES EM DESENVOLVIMENTO
  {
    id: 'notifications',
    title: 'Sistema de Notificações',
    description: 'Notificações em tempo real para pedidos, estoque e alertas',
    status: 'development',
    priority: 'high',
    category: 'Core',
    icon: ExclamationTriangleIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    progress: 75,
    releaseDate: '2024-08-15'
  },
  {
    id: 'reports',
    title: 'Relatórios Avançados',
    description: 'Relatórios exportáveis em PDF e Excel com análises detalhadas',
    status: 'development',
    priority: 'high',
    category: 'Analytics',
    icon: ChartBarIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    progress: 60,
    releaseDate: '2024-08-30'
  },
  {
    id: 'mobile-app',
    title: 'App Mobile PWA',
    description: 'Aplicativo mobile otimizado com funcionalidades offline',
    status: 'development',
    priority: 'high',
    category: 'Mobile',
    icon: QrCodeIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    progress: 40,
    releaseDate: '2024-09-15'
  },

  // FUNCIONALIDADES PLANEJADAS
  {
    id: 'delivery-integration',
    title: 'Integração com Delivery',
    description: 'Integração com iFood, Uber Eats, Rappi e outros',
    status: 'planned',
    priority: 'high',
    category: 'Integrações',
    icon: TruckIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    releaseDate: '2024-10-01'
  },
  {
    id: 'reservations',
    title: 'Sistema de Reservas',
    description: 'Gestão de mesas, reservas e lista de espera',
    status: 'planned',
    priority: 'high',
    category: 'Operacional',
    icon: ClockIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    releaseDate: '2024-10-15'
  },
  {
    id: 'payments',
    title: 'Sistema de Pagamentos',
    description: 'Integração com PIX, cartões e outros métodos de pagamento',
    status: 'planned',
    priority: 'high',
    category: 'Financeiro',
    icon: CreditCardIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    releaseDate: '2024-11-01'
  },
  {
    id: 'inventory-management',
    title: 'Gestão de Estoque Inteligente',
    description: 'Controle automático de estoque com alertas e pedidos automáticos',
    status: 'planned',
    priority: 'high',
    category: 'Operacional',
    icon: CubeIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    releaseDate: '2024-11-15'
  },
  {
    id: 'ai-predictions',
    title: 'IA para Previsões',
    description: 'Machine Learning para previsão de demanda e otimização',
    status: 'planned',
    priority: 'medium',
    category: 'IA/Automação',
    icon: SparklesIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    releaseDate: '2024-12-01'
  },
  {
    id: 'loyalty-program',
    title: 'Programa de Fidelidade',
    description: 'Sistema de pontos, recompensas e fidelização de clientes',
    status: 'planned',
    priority: 'medium',
    category: 'Marketing',
    icon: GiftIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    releaseDate: '2024-12-15'
  },
  {
    id: 'multi-location',
    title: 'Multi-localização',
    description: 'Gestão de múltiplos restaurantes e franquias',
    status: 'planned',
    priority: 'medium',
    category: 'Escalabilidade',
    icon: BuildingStorefrontIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    releaseDate: '2025-01-01'
  },
  {
    id: 'chatbot',
    title: 'Chatbot Inteligente',
    description: 'Atendimento automatizado via WhatsApp e chat',
    status: 'planned',
    priority: 'medium',
    category: 'IA/Automação',
    icon: UserGroupIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    releaseDate: '2025-01-15'
  },

  // IDEIAS FUTURAS
  {
    id: 'virtual-reality',
    title: 'Tour Virtual do Restaurante',
    description: 'Experiência imersiva para clientes conhecerem o ambiente',
    status: 'idea',
    priority: 'low',
    category: 'Inovação',
    icon: GlobeAltIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200'
  },
  {
    id: 'blockchain',
    title: 'Rastreabilidade Blockchain',
    description: 'Rastreamento completo da cadeia de suprimentos',
    status: 'idea',
    priority: 'low',
    category: 'Inovação',
    icon: ShieldCheckIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200'
  },
  {
    id: 'voice-commands',
    title: 'Comandos por Voz',
    description: 'Controle do sistema através de comandos de voz',
    status: 'idea',
    priority: 'low',
    category: 'Inovação',
    icon: BeakerIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200'
  },
  {
    id: 'ar-menu',
    title: 'Cardápio em Realidade Aumentada',
    description: 'Visualização 3D dos pratos através de AR',
    status: 'idea',
    priority: 'low',
    category: 'Inovação',
    icon: QrCodeIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200'
  }
]

const categories = [
  { id: 'all', name: 'Todas', icon: GlobeAltIcon },
  { id: 'Core', name: 'Core', icon: CogIcon },
  { id: 'Financeiro', name: 'Financeiro', icon: CurrencyDollarIcon },
  { id: 'Vendas', name: 'Vendas', icon: ShoppingCartIcon },
  { id: 'Operacional', name: 'Operacional', icon: BuildingStorefrontIcon },
  { id: 'Analytics', name: 'Analytics', icon: ChartBarIcon },
  { id: 'Mobile', name: 'Mobile', icon: QrCodeIcon },
  { id: 'Integrações', name: 'Integrações', icon: GlobeAltIcon },
  { id: 'IA/Automação', name: 'IA/Automação', icon: SparklesIcon },
  { id: 'Marketing', name: 'Marketing', icon: HeartIcon },
  { id: 'Admin', name: 'Admin', icon: UserGroupIcon },
  { id: 'Digital', name: 'Digital', icon: QrCodeIcon },
  { id: 'Escalabilidade', name: 'Escalabilidade', icon: ArrowTrendingUpIcon },
  { id: 'Inovação', name: 'Inovação', icon: RocketLaunchIcon }
]

const statusConfig = {
  released: { label: 'Disponível', color: 'green', icon: CheckCircleIcon },
  beta: { label: 'Beta', color: 'blue', icon: BeakerIcon },
  development: { label: 'Em Desenvolvimento', color: 'blue', icon: ClockIcon },
  planned: { label: 'Planejado', color: 'orange', icon: ClockIcon },
  idea: { label: 'Ideia', color: 'purple', icon: LightBulbIcon }
}

const priorityConfig = {
  high: { label: 'Alta', color: 'red', icon: FireIcon },
  medium: { label: 'Média', color: 'orange', icon: StarIcon },
  low: { label: 'Baixa', color: 'gray', icon: ClockIcon }
}

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredFeatures = features.filter(feature => {
    const categoryMatch = selectedCategory === 'all' || feature.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || feature.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    return config?.icon || ClockIcon
  }

  const getPriorityIcon = (priority: string) => {
    const config = priorityConfig[priority as keyof typeof priorityConfig]
    return config?.icon || StarIcon
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category?.icon || GlobeAltIcon
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <RocketLaunchIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <Title className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Roadmap de Funcionalidades
              </Title>
              <Text className="text-gray-600 mt-1">
                Acompanhe o desenvolvimento e descubra o que está por vir no DonMenu
              </Text>
            </div>
          </div>

                  {/* Development Stats */}
        <DevelopmentStats />
        </div>

        {/* Filters */}
        <Card className="mb-8 p-6">
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex-1 min-w-64">
              <Text className="font-medium text-gray-700 mb-2">Categoria</Text>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex-1 min-w-64">
              <Text className="font-medium text-gray-700 mb-2">Status</Text>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os Status</option>
                {Object.entries(statusConfig).map(([status, config]) => (
                  <option key={status} value={status}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature) => {
            const StatusIcon = getStatusIcon(feature.status)
            const PriorityIcon = getPriorityIcon(feature.priority)
            const CategoryIcon = getCategoryIcon(feature.category)
            const statusInfo = statusConfig[feature.status as keyof typeof statusConfig]
            const priorityInfo = priorityConfig[feature.priority as keyof typeof priorityConfig]

            return (
              <Card key={feature.id} className={`p-6 ${feature.bgColor} hover:shadow-lg transition-all duration-200`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${feature.bgColor.replace('bg-', 'bg-').replace('-50', '-100')}`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div>
                      <Title className="text-lg font-semibold text-gray-800">
                        {feature.title}
                      </Title>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge color={statusInfo?.color as any} size="xs">
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo?.label}
                        </Badge>
                        <Badge color={priorityInfo?.color as any} size="xs">
                          <PriorityIcon className="w-3 h-3 mr-1" />
                          {priorityInfo?.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <Text className="text-gray-600 mb-4">
                  {feature.description}
                </Text>

                {/* Category */}
                <div className="flex items-center space-x-2 mb-4">
                  <CategoryIcon className="w-4 h-4 text-gray-500" />
                  <Text className="text-sm text-gray-500">{feature.category}</Text>
                </div>

                {/* Progress Bar (for development features) */}
                {feature.status === 'development' && feature.progress && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-sm font-medium text-gray-700">Progresso</Text>
                      <Text className="text-sm font-bold text-blue-600">{feature.progress}%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${feature.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Release Date */}
                {feature.releaseDate && (
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-4 h-4 text-gray-500" />
                    <Text className="text-sm text-gray-500">
                      {new Date(feature.releaseDate).toLocaleDateString('pt-BR')}
                    </Text>
                  </div>
                )}

                {/* Dependencies */}
                {feature.dependencies && feature.dependencies.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Dependências:</Text>
                    <div className="flex flex-wrap gap-1">
                      {feature.dependencies.map((dep, index) => (
                        <Badge key={index} color="gray" size="xs">
                          {dep}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredFeatures.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <StarIcon className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <Title className="text-xl font-semibold text-gray-800 mb-2">
                  Nenhuma funcionalidade encontrada
                </Title>
                <Text className="text-gray-600">
                  Tente ajustar os filtros para ver mais resultados
                </Text>
              </div>
            </div>
          </Card>
        )}

        {/* Footer */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="text-center">
            <Title className="text-xl font-semibold text-blue-800 mb-2">
              💡 Tem uma sugestão?
            </Title>
            <Text className="text-blue-600 mb-4">
              Queremos ouvir suas ideias para melhorar o DonMenu
            </Text>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Enviar Sugestão
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

 