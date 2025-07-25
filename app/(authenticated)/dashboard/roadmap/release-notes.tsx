import { Card, Title, Text, Badge } from '@tremor/react'
import { 
  CheckCircleIcon, 
  SparklesIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'

interface Release {
  version: string
  date: string
  title: string
  description: string
  type: 'major' | 'minor' | 'patch' | 'hotfix'
  features: string[]
  fixes: string[]
  improvements: string[]
}

const releases: Release[] = [
  {
    version: '2.1.0',
    date: '2024-07-25',
    title: 'Perfil do Usuário e Roadmap',
    description: 'Nova funcionalidade de perfil e página de roadmap completa',
    type: 'minor',
    features: [
      'Página de perfil do usuário com edição de dados pessoais',
      'Roadmap completo com todas as funcionalidades',
      'Estatísticas de desenvolvimento',
      'Filtros por categoria e status'
    ],
    fixes: [
      'Correção de bugs no dashboard',
      'Melhorias na responsividade'
    ],
    improvements: [
      'Interface mais moderna e intuitiva',
      'Melhor organização das funcionalidades'
    ]
  },
  {
    version: '2.0.0',
    date: '2024-07-20',
    title: 'Sistema Financeiro Completo',
    description: 'Implementação completa do sistema financeiro',
    type: 'major',
    features: [
      'Controle de caixa',
      'Gestão de receitas e despesas',
      'Relatórios financeiros',
      'Categorização de transações'
    ],
    fixes: [],
    improvements: [
      'Interface mais limpa',
      'Performance otimizada'
    ]
  },
  {
    version: '1.5.0',
    date: '2024-07-15',
    title: 'Sistema de Pedidos',
    description: 'Implementação do sistema completo de pedidos',
    type: 'minor',
    features: [
      'Criação e gestão de pedidos',
      'Status de pedidos em tempo real',
      'Histórico de vendas',
      'Relatórios de vendas'
    ],
    fixes: [
      'Correção de bugs na ficha técnica'
    ],
    improvements: [
      'Interface mais responsiva',
      'Melhor experiência do usuário'
    ]
  },
  {
    version: '1.4.0',
    date: '2024-07-10',
    title: 'QR Code e Cardápio Digital',
    description: 'Sistema de QR code para cardápio digital',
    type: 'minor',
    features: [
      'Geração de QR codes',
      'Cardápio digital público',
      'Personalização de cardápio'
    ],
    fixes: [],
    improvements: [
      'Design mais moderno',
      'Melhor performance'
    ]
  },
  {
    version: '1.3.0',
    date: '2024-07-05',
    title: 'Fichas Técnicas',
    description: 'Sistema completo de fichas técnicas',
    type: 'minor',
    features: [
      'Criação de receitas',
      'Cálculo de custos',
      'Gestão de ingredientes por prato',
      'Análise de CMV'
    ],
    fixes: [
      'Correção de bugs no cadastro de ingredientes'
    ],
    improvements: [
      'Interface mais intuitiva',
      'Cálculos mais precisos'
    ]
  },
  {
    version: '1.2.0',
    date: '2024-07-01',
    title: 'Gestão de Cardápio',
    description: 'Sistema de gestão de cardápio e itens',
    type: 'minor',
    features: [
      'Cadastro de itens do cardápio',
      'Categorização de pratos',
      'Gestão de preços',
      'Upload de imagens'
    ],
    fixes: [],
    improvements: [
      'Interface mais amigável',
      'Melhor organização'
    ]
  },
  {
    version: '1.1.0',
    date: '2024-06-25',
    title: 'Gestão de Insumos',
    description: 'Sistema de gestão de ingredientes e estoque',
    type: 'minor',
    features: [
      'Cadastro de ingredientes',
      'Controle de estoque',
      'Gestão de fornecedores',
      'Histórico de preços'
    ],
    fixes: [],
    improvements: [
      'Interface mais limpa',
      'Melhor usabilidade'
    ]
  },
  {
    version: '1.0.0',
    date: '2024-06-20',
    title: 'Lançamento Inicial',
    description: 'Primeira versão do DonMenu',
    type: 'major',
    features: [
      'Dashboard principal',
      'Sistema de autenticação',
      'Gestão de restaurantes',
      'Gestão de usuários'
    ],
    fixes: [],
    improvements: []
  }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'major': return 'red'
    case 'minor': return 'blue'
    case 'patch': return 'green'
    case 'hotfix': return 'orange'
    default: return 'gray'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'major': return SparklesIcon
    case 'minor': return CheckCircleIcon
    case 'patch': return WrenchScrewdriverIcon
    case 'hotfix': return ExclamationTriangleIcon
    default: return CheckCircleIcon
  }
}

export default function ReleaseNotes() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Title className="text-2xl font-bold text-gray-800 mb-2">
          📋 Histórico de Releases
        </Title>
        <Text className="text-gray-600">
          Acompanhe todas as atualizações e melhorias do DonMenu
        </Text>
      </div>

      {releases.map((release, index) => {
        const TypeIcon = getTypeIcon(release.type)
        
        return (
          <Card key={release.version} className="p-6 hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  getTypeColor(release.type) === 'red' ? 'bg-red-100' :
                  getTypeColor(release.type) === 'blue' ? 'bg-blue-100' :
                  getTypeColor(release.type) === 'green' ? 'bg-green-100' :
                  'bg-orange-100'
                }`}>
                  <TypeIcon className={`w-6 h-6 ${
                    getTypeColor(release.type) === 'red' ? 'text-red-600' :
                    getTypeColor(release.type) === 'blue' ? 'text-blue-600' :
                    getTypeColor(release.type) === 'green' ? 'text-green-600' :
                    'text-orange-600'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <Title className="text-xl font-bold text-gray-800">
                      v{release.version}
                    </Title>
                    <Badge color={getTypeColor(release.type) as any} size="sm">
                      {release.type.toUpperCase()}
                    </Badge>
                  </div>
                  <Text className="text-lg font-semibold text-gray-700">
                    {release.title}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {new Date(release.date).toLocaleDateString('pt-BR')}
                  </Text>
                </div>
              </div>
            </div>

            {/* Description */}
            <Text className="text-gray-600 mb-6">
              {release.description}
            </Text>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* New Features */}
              {release.features.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <SparklesIcon className="w-5 h-5 text-green-600" />
                    <Text className="font-semibold text-gray-800">Novas Funcionalidades</Text>
                  </div>
                  <ul className="space-y-2">
                    {release.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <Text className="text-sm text-gray-600">{feature}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fixes */}
              {release.fixes.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                    <Text className="font-semibold text-gray-800">Correções</Text>
                  </div>
                  <ul className="space-y-2">
                    {release.fixes.map((fix, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <Text className="text-sm text-gray-600">{fix}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {release.improvements.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <WrenchScrewdriverIcon className="w-5 h-5 text-blue-600" />
                    <Text className="font-semibold text-gray-800">Melhorias</Text>
                  </div>
                  <ul className="space-y-2">
                    {release.improvements.map((improvement, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <Text className="text-sm text-gray-600">{improvement}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Divider */}
            {index < releases.length - 1 && (
              <div className="mt-6 pt-6 border-t border-gray-200"></div>
            )}
          </Card>
        )
      })}
    </div>
  )
} 