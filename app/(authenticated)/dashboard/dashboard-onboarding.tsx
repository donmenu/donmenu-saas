import { useState, useEffect } from 'react'
import { Card, Title, Text, Button, Badge } from '@tremor/react'
import { CheckCircleIcon, PlusIcon, ClipboardDocumentListIcon, ChartBarIcon } from '@heroicons/react/24/outline'
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
  const router = useRouter()

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

  return (
    <Card className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg">
      <Title className="text-2xl font-bold mb-2">Bem-vindo ao DonMenu!</Title>
      <Text className="mb-6 text-gray-700">Vamos te ajudar a configurar seu restaurante em poucos passos:</Text>
      <div className="space-y-4">
        {/* Passo 1 */}
        <div className="flex items-center space-x-4">
          <Badge color={checklist.insumos ? 'green' : 'gray'}>
            {checklist.insumos ? <CheckCircleIcon className="w-5 h-5" /> : '1'}
          </Badge>
          <Text className={checklist.insumos ? 'line-through text-gray-400' : 'text-gray-800'}>
            Cadastre seus insumos/ingredientes
          </Text>
          <Button
            size="xs"
            icon={PlusIcon}
            disabled={checklist.insumos || loading}
            onClick={() => router.push('/dashboard/supplies')}
          >Cadastrar</Button>
        </div>
        {/* Passo 2 */}
        <div className="flex items-center space-x-4">
          <Badge color={checklist.cardapio ? 'green' : checklist.insumos ? 'gray' : 'gray'}>
            {checklist.cardapio ? <CheckCircleIcon className="w-5 h-5" /> : '2'}
          </Badge>
          <Text className={checklist.cardapio ? 'line-through text-gray-400' : checklist.insumos ? 'text-gray-800' : 'text-gray-400'}>
            Adicione itens ao cardápio
          </Text>
          <Button
            size="xs"
            icon={PlusIcon}
            disabled={!checklist.insumos || checklist.cardapio || loading}
            onClick={() => router.push('/dashboard/cardapio')}
          >Adicionar</Button>
        </div>
        {/* Passo 3 */}
        <div className="flex items-center space-x-4">
          <Badge color={checklist.ficha ? 'green' : checklist.cardapio ? 'gray' : 'gray'}>
            {checklist.ficha ? <CheckCircleIcon className="w-5 h-5" /> : '3'}
          </Badge>
          <Text className={checklist.ficha ? 'line-through text-gray-400' : checklist.cardapio ? 'text-gray-800' : 'text-gray-400'}>
            Monte a ficha técnica dos itens
          </Text>
          <Button
            size="xs"
            icon={ClipboardDocumentListIcon}
            disabled={!checklist.cardapio || checklist.ficha || loading}
            onClick={() => router.push('/dashboard/ficha-tecnica')}
          >Montar</Button>
        </div>
        {/* Passo 4 */}
        <div className="flex items-center space-x-4">
          <Badge color={checklist.cmv ? 'green' : checklist.ficha ? 'gray' : 'gray'}>
            {checklist.cmv ? <CheckCircleIcon className="w-5 h-5" /> : '4'}
          </Badge>
          <Text className={checklist.cmv ? 'line-through text-gray-400' : checklist.ficha ? 'text-gray-800' : 'text-gray-400'}>
            Visualize o CMV dos produtos
          </Text>
          <Button
            size="xs"
            icon={ChartBarIcon}
            disabled={!checklist.ficha || checklist.cmv || loading}
            onClick={() => router.push('/dashboard/ficha-tecnica')}
          >Visualizar CMV</Button>
        </div>
      </div>
    </Card>
  )
} 