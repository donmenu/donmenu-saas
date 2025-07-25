import { Card, Title, Text, Badge } from '@tremor/react'
import { 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

interface Insight {
  type: 'success' | 'warning' | 'info' | 'tip'
  title: string
  message: string
  icon: any
  color: string
  bgColor: string
}

export default function Insights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInsights() {
      try {
        // Buscar dados para gerar insights
        const [ingredients, menuItems, recipes, orders] = await Promise.all([
          fetch('/api/ingredients').then(res => res.json()).catch(() => []),
          fetch('/api/cardapios').then(res => res.json()).catch(() => []),
          fetch('/api/ficha-tecnica').then(res => res.json()).catch(() => []),
          fetch('/api/pedidos').then(res => res.json()).catch(() => [])
        ])

        const newInsights: Insight[] = []

        // Insight sobre ingredientes
        if (ingredients.length === 0) {
          newInsights.push({
            type: 'warning',
            title: 'Cadastre seus ingredientes',
            message: 'Adicione os ingredientes que você usa para começar a criar seus pratos.',
            icon: ExclamationTriangleIcon,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 border-orange-200'
          })
        } else if (ingredients.length < 5) {
          newInsights.push({
            type: 'info',
            title: 'Expandir ingredientes',
            message: `Você tem ${ingredients.length} ingredientes cadastrados. Considere adicionar mais para ter mais opções.`,
            icon: LightBulbIcon,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 border-blue-200'
          })
        } else {
          newInsights.push({
            type: 'success',
            title: 'Ingredientes bem organizados',
            message: `Excelente! Você tem ${ingredients.length} ingredientes cadastrados.`,
            icon: CheckCircleIcon,
            color: 'text-green-600',
            bgColor: 'bg-green-50 border-green-200'
          })
        }

        // Insight sobre cardápio
        if (menuItems.length === 0) {
          newInsights.push({
            type: 'warning',
            title: 'Crie seu cardápio',
            message: 'Adicione pratos ao seu cardápio para começar a vender.',
            icon: ExclamationTriangleIcon,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 border-orange-200'
          })
        } else if (menuItems.length < 10) {
          newInsights.push({
            type: 'info',
            title: 'Diversifique seu cardápio',
            message: `Você tem ${menuItems.length} itens no cardápio. Considere adicionar mais opções.`,
            icon: LightBulbIcon,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 border-blue-200'
          })
        } else {
          newInsights.push({
            type: 'success',
            title: 'Cardápio diversificado',
            message: `Ótimo! Seu cardápio tem ${menuItems.length} itens.`,
            icon: CheckCircleIcon,
            color: 'text-green-600',
            bgColor: 'bg-green-50 border-green-200'
          })
        }

        // Insight sobre fichas técnicas
        if (recipes.length === 0) {
          newInsights.push({
            type: 'warning',
            title: 'Configure fichas técnicas',
            message: 'Crie fichas técnicas para controlar custos e lucros dos seus pratos.',
            icon: ExclamationTriangleIcon,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 border-orange-200'
          })
        } else {
          newInsights.push({
            type: 'success',
            title: 'Controle de custos ativo',
            message: `Você tem ${recipes.length} fichas técnicas configuradas.`,
            icon: CheckCircleIcon,
            color: 'text-green-600',
            bgColor: 'bg-green-50 border-green-200'
          })
        }

        // Insight sobre pedidos
        if (orders.length > 0) {
          const recentOrders = orders.filter((order: any) => {
            const orderDate = new Date(order.created_at)
            const weekAgo = new Date()
            weekAgo.setDate(weekAgo.getDate() - 7)
            return orderDate > weekAgo
          })

          if (recentOrders.length > 0) {
                         newInsights.push({
               type: 'success',
               title: 'Atividade recente',
               message: `Você teve ${recentOrders.length} pedidos na última semana.`,
               icon: ArrowTrendingUpIcon,
               color: 'text-green-600',
               bgColor: 'bg-green-50 border-green-200'
             })
          }
        }

        // Dica geral
        newInsights.push({
          type: 'tip',
          title: 'Dica de gestão',
          message: 'Revise seus preços regularmente baseado nos custos dos ingredientes para manter a lucratividade.',
          icon: LightBulbIcon,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50 border-purple-200'
        })

        setInsights(newInsights)
      } catch (error) {
        console.error('Erro ao buscar insights:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [])

  if (loading) {
    return (
      <Card className="mb-8 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    )
  }

  if (insights.length === 0) {
    return null
  }

  return (
    <Card className="mb-8 p-6">
      <div className="mb-4">
        <Title className="text-lg font-semibold text-gray-800 mb-2">
          💡 Insights e Dicas
        </Title>
        <Text className="text-gray-600">
          Análises baseadas nos seus dados para melhorar seu restaurante
        </Text>
      </div>

      <div className="space-y-4">
        {insights.slice(0, 4).map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${insight.bgColor} transition-all duration-200 hover:shadow-sm`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${insight.bgColor.replace('bg-', 'bg-').replace('-50', '-100')}`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Text className="font-medium text-gray-800">
                    {insight.title}
                  </Text>
                  <Badge 
                    color={
                      insight.type === 'success' ? 'green' : 
                      insight.type === 'warning' ? 'orange' : 
                      insight.type === 'info' ? 'blue' : 'purple'
                    }
                    size="xs"
                  >
                    {insight.type === 'success' ? 'Sucesso' :
                     insight.type === 'warning' ? 'Atenção' :
                     insight.type === 'info' ? 'Info' : 'Dica'}
                  </Badge>
                </div>
                <Text className="text-sm text-gray-600">
                  {insight.message}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>

      {insights.length > 4 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Text className="text-sm text-gray-500 text-center">
            +{insights.length - 4} insights adicionais disponíveis
          </Text>
        </div>
      )}
    </Card>
  )
} 