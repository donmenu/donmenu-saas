'use client'

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react'
import { useEffect, useState } from 'react'
import { ClockIcon, CheckCircleIcon, XCircleIcon, EyeIcon } from '@heroicons/react/24/outline'
import PedidosTable from './table-pedidos'
import DashboardShell from '../DashboardShell';

interface PedidoItem {
  id: number
  restaurant_id: number
  sale_id: number
  menu_item_id: number
  combo_id: number | null
  quantity: number
  unit_price: string
  total_price: string
  cost_price: string | null
  gross_profit: string | null
  margin: string | null
  created_at: string
  menu_item: {
    id: number
    name: string
    description: string | null
    price: string
  }
}

interface Pedido {
  id: number
  restaurant_id: number
  sale_number: string
  customer_name: string | null
  customer_phone: string | null
  subtotal: string
  discount: string
  total: string
  payment_method: string
  status: string
  notes: string | null
  created_at: string
  updated_at: string
  items: PedidoItem[]
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/pedidos')
      if (!response.ok) {
        throw new Error('Erro ao buscar dados')
      }
      const data = await response.json()
      setPedidos(data)
    } catch (error: any) {
      console.error('Erro ao buscar dados:', error.message)
      setErrorMessage('Não foi possível conectar ao banco de dados.')
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Calcular métricas
  const totalPedidos = pedidos.length
  const pendentes = pedidos.filter(p => p.status === 'pending').length
  const preparando = pedidos.filter(p => p.status === 'preparing').length
  const prontos = pedidos.filter(p => p.status === 'ready').length
  const entregues = pedidos.filter(p => p.status === 'completed').length

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'yellow'
      case 'preparing': return 'blue'
      case 'ready': return 'green'
      case 'completed': return 'gray'
      case 'cancelled': return 'red'
      default: return 'gray'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return ClockIcon
      case 'preparing': return ClockIcon
      case 'ready': return CheckCircleIcon
      case 'completed': return CheckCircleIcon
      case 'cancelled': return XCircleIcon
      default: return ClockIcon
    }
  }

  return (
    <DashboardShell>
      {/* Header com métricas */}
      <div className="mb-8">
        <div className="mb-6">
          <Title className="text-3xl font-bold text-gray-900 dark:text-white">Pedidos</Title>
          <Text className="text-gray-600 dark:text-gray-300 mt-2">Gerencie os pedidos dos clientes</Text>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-blue-600 dark:text-blue-400 font-medium">Total</Text>
                <Metric className="text-blue-900 dark:text-blue-300">{totalPedidos}</Metric>
              </div>
              <Badge color="blue" className="bg-blue-200 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                <EyeIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-yellow-600 dark:text-yellow-400 font-medium">Pendentes</Text>
                <Metric className="text-yellow-900 dark:text-yellow-300">{pendentes}</Metric>
              </div>
              <Badge color="yellow" className="bg-yellow-200 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                <ClockIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-indigo-600 dark:text-indigo-400 font-medium">Preparando</Text>
                <Metric className="text-indigo-900 dark:text-indigo-300">{preparando}</Metric>
              </div>
              <Badge color="indigo" className="bg-indigo-200 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                <ClockIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-green-600 dark:text-green-400 font-medium">Prontos</Text>
                <Metric className="text-green-900 dark:text-green-300">{prontos}</Metric>
              </div>
              <Badge color="green" className="bg-green-200 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                <CheckCircleIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-gray-600 dark:text-gray-400 font-medium">Entregues</Text>
                <Metric className="text-gray-900 dark:text-gray-300">{entregues}</Metric>
              </div>
              <Badge color="gray" className="bg-gray-200 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300">
                <CheckCircleIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>
        </div>
      </div>

      {/* Tabela */}
      <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <Title className="text-xl font-semibold text-gray-800 dark:text-white">Lista de Pedidos</Title>
          <Text className="text-gray-600 dark:text-gray-300 mt-1">Visualize e gerencie todos os pedidos</Text>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <Text className="ml-3 text-gray-500 dark:text-gray-400">Carregando pedidos...</Text>
            </div>
          ) : errorMessage ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <Text className="text-red-600 dark:text-red-400 font-medium">{errorMessage}</Text>
            </div>
          ) : pedidos.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <ClockIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <Title className="text-gray-500 dark:text-gray-400 mb-2">Nenhum pedido encontrado</Title>
              <Text className="text-gray-400 dark:text-gray-500">Os pedidos aparecerão aqui quando forem criados</Text>
            </div>
          ) : (
            <PedidosTable pedidos={pedidos} onUpdate={fetchData} />
          )}
        </div>
      </Card>
    </DashboardShell>
  )
} 