import { useState, useEffect } from 'react'
import { Card, Title, Text, Button, Badge } from '@tremor/react'
import { 
  CheckCircleIcon, 
  PlusIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  XMarkIcon,
  SparklesIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface Checklist {
  insumos: boolean
  cardapio: boolean
  ficha: boolean
  cmv: boolean
}

const defaultChecklist: Checklist = {
  insumos: false,
  cardapio: false,
  ficha: false,
  cmv: false,
}

async function fetchCount(url: string): Promise<number> {
  try {
    const res = await fetch(url)
    if (!res.ok) return 0
    const data = await res.json()
    return Array.isArray(data) ? data.length : 0
  } catch {
    return 0
  }
}

export default function DashboardOnboarding() {
  const [checklist, setChecklist] = useState<Checklist>(defaultChecklist)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [isDismissed, setIsDismissed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário já fechou o welcome board
    const dismissed = localStorage.getItem('donmenu-welcome-dismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
    }
  }, [])

  useEffect(() => {
    // Checar dados reais do backend
    async function checkData() {
      setLoading(true)
      const [insumos, cardapio, ficha] = await Promise.all([
        fetchCount('/api/ingredients'),
        fetchCount('/api/cardapios'),
        fetchCount('/api/ficha-tecnica'),
      ])
      setChecklist({
        insumos: insumos > 0,
        cardapio: cardapio > 0,
        ficha: ficha > 0,
        cmv: ficha > 0, // CMV depende de ficha técnica
      })
      setLoading(false)
    }
    checkData()
  }, [])

  // Calcular progresso
  const completedSteps = Object.values(checklist).filter(Boolean).length
  const totalSteps = Object.keys(checklist).length
  const progressPercentage = (completedSteps / totalSteps) * 100

  // Ocultar se todos os passos estiverem completos ou se foi fechado
  const shouldHide = isDismissed || (completedSteps === totalSteps && !loading)

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem('donmenu-welcome-dismissed', 'true')
  }

  const handleRestart = () => {
    setIsDismissed(false)
    localStorage.removeItem('donmenu-welcome-dismissed')
  }

  if (shouldHide) {
    return (
      <div className="mb-8">
        {completedSteps === totalSteps ? (
          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <Title className="text-green-800">🎉 Parabéns! Seu restaurante está configurado!</Title>
                  <Text className="text-green-600">Todos os passos foram concluídos com sucesso.</Text>
                </div>
              </div>
              <Button 
                size="xs" 
                variant="secondary"
                onClick={handleRestart}
                className="text-green-700 border-green-300 hover:bg-green-100"
              >
                Ver novamente
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <RocketLaunchIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <Title className="text-blue-800">🚀 Continue configurando seu restaurante</Title>
                  <Text className="text-blue-600">Você fechou o guia, mas ainda há passos pendentes.</Text>
                </div>
              </div>
              <Button 
                size="xs" 
                variant="secondary"
                onClick={handleRestart}
                className="text-blue-700 border-blue-300 hover:bg-blue-100"
              >
                Reabrir guia
              </Button>
            </div>
          </Card>
        )}
      </div>
    )
  }

  return (
    <Card className="mb-8 p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border-0 shadow-lg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100/30 to-blue-100/30 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full translate-y-12 -translate-x-12"></div>
      
      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-all duration-200"
        title="Fechar guia"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <Title className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Bem-vindo ao DonMenu!
            </Title>
            <Text className="text-gray-600 mt-1">
              Vamos te ajudar a configurar seu restaurante em poucos passos
            </Text>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <Text className="text-sm font-medium text-gray-700">
              Progresso: {completedSteps} de {totalSteps} passos
            </Text>
            <Text className="text-sm font-bold text-green-600">
              {progressPercentage.toFixed(0)}%
            </Text>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="relative z-10 space-y-4">
        {/* Passo 1 */}
        <div className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 ${
          checklist.insumos ? 'bg-green-50 border border-green-200' : 'bg-white/50 border border-gray-200'
        }`}>
          <Badge color={checklist.insumos ? 'green' : 'gray'} className="flex-shrink-0">
            {checklist.insumos ? <CheckCircleIcon className="w-5 h-5" /> : '1'}
          </Badge>
          <div className="flex-1">
            <Text className={`font-medium ${checklist.insumos ? 'line-through text-green-600' : 'text-gray-800'}`}>
              Cadastre seus insumos/ingredientes
            </Text>
            {!checklist.insumos && (
              <Text className="text-sm text-gray-500 mt-1">
                Adicione os ingredientes que você usa no seu restaurante
              </Text>
            )}
          </div>
          <Button
            size="xs"
            icon={PlusIcon}
            disabled={checklist.insumos || loading}
            onClick={() => router.push('/dashboard/supplies')}
            className={checklist.insumos ? 'bg-green-100 text-green-700' : ''}
          >
            {checklist.insumos ? 'Concluído' : 'Cadastrar'}
          </Button>
        </div>

        {/* Passo 2 */}
        <div className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 ${
          checklist.cardapio ? 'bg-green-50 border border-green-200' : checklist.insumos ? 'bg-white/50 border border-gray-200' : 'bg-gray-50 border border-gray-200'
        }`}>
          <Badge color={checklist.cardapio ? 'green' : checklist.insumos ? 'gray' : 'gray'} className="flex-shrink-0">
            {checklist.cardapio ? <CheckCircleIcon className="w-5 h-5" /> : '2'}
          </Badge>
          <div className="flex-1">
            <Text className={`font-medium ${checklist.cardapio ? 'line-through text-green-600' : checklist.insumos ? 'text-gray-800' : 'text-gray-400'}`}>
              Adicione itens ao cardápio
            </Text>
            {!checklist.cardapio && checklist.insumos && (
              <Text className="text-sm text-gray-500 mt-1">
                Crie os pratos do seu menu usando os ingredientes cadastrados
              </Text>
            )}
          </div>
          <Button
            size="xs"
            icon={PlusIcon}
            disabled={!checklist.insumos || checklist.cardapio || loading}
            onClick={() => router.push('/dashboard/cardapio')}
            className={checklist.cardapio ? 'bg-green-100 text-green-700' : ''}
          >
            {checklist.cardapio ? 'Concluído' : 'Adicionar'}
          </Button>
        </div>

        {/* Passo 3 */}
        <div className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 ${
          checklist.ficha ? 'bg-green-50 border border-green-200' : checklist.cardapio ? 'bg-white/50 border border-gray-200' : 'bg-gray-50 border border-gray-200'
        }`}>
          <Badge color={checklist.ficha ? 'green' : checklist.cardapio ? 'gray' : 'gray'} className="flex-shrink-0">
            {checklist.ficha ? <CheckCircleIcon className="w-5 h-5" /> : '3'}
          </Badge>
          <div className="flex-1">
            <Text className={`font-medium ${checklist.ficha ? 'line-through text-green-600' : checklist.cardapio ? 'text-gray-800' : 'text-gray-400'}`}>
              Monte a ficha técnica dos itens
            </Text>
            {!checklist.ficha && checklist.cardapio && (
              <Text className="text-sm text-gray-500 mt-1">
                Defina as receitas e custos de cada prato
              </Text>
            )}
          </div>
          <Button
            size="xs"
            icon={ClipboardDocumentListIcon}
            disabled={!checklist.cardapio || checklist.ficha || loading}
            onClick={() => router.push('/dashboard/ficha-tecnica')}
            className={checklist.ficha ? 'bg-green-100 text-green-700' : ''}
          >
            {checklist.ficha ? 'Concluído' : 'Montar'}
          </Button>
        </div>

        {/* Passo 4 */}
        <div className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 ${
          checklist.cmv ? 'bg-green-50 border border-green-200' : checklist.ficha ? 'bg-white/50 border border-gray-200' : 'bg-gray-50 border border-gray-200'
        }`}>
          <Badge color={checklist.cmv ? 'green' : checklist.ficha ? 'gray' : 'gray'} className="flex-shrink-0">
            {checklist.cmv ? <CheckCircleIcon className="w-5 h-5" /> : '4'}
          </Badge>
          <div className="flex-1">
            <Text className={`font-medium ${checklist.cmv ? 'line-through text-green-600' : checklist.ficha ? 'text-gray-800' : 'text-gray-400'}`}>
              Visualize o CMV dos produtos
            </Text>
            {!checklist.cmv && checklist.ficha && (
              <Text className="text-sm text-gray-500 mt-1">
                Analise o custo das mercadorias vendidas e otimize seus lucros
              </Text>
            )}
          </div>
          <Button
            size="xs"
            icon={ChartBarIcon}
            disabled={!checklist.ficha || checklist.cmv || loading}
            onClick={() => router.push('/dashboard/cmv')}
            className={checklist.cmv ? 'bg-green-100 text-green-700' : ''}
          >
            {checklist.cmv ? 'Concluído' : 'Visualizar CMV'}
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <Text className="text-sm text-gray-500">
            💡 Dica: Complete todos os passos para desbloquear recursos avançados
          </Text>
          <Button 
            size="xs" 
            variant="secondary"
            onClick={handleDismiss}
            className="text-gray-600 border-gray-300 hover:bg-gray-100"
          >
            Fechar guia
          </Button>
        </div>
      </div>
    </Card>
  )
} 