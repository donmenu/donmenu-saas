'use client'

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react'
import { useEffect, useState } from 'react'
import { ClockIcon, CheckCircleIcon, XCircleIcon, EyeIcon } from '@heroicons/react/24/outline'
import PedidosTable from './table-pedidos'

interface PedidoItem {
  id: number
  pedido_id: number
  item_id: number
  quantidade: number
  preco_unit: number
  observacoes?: string
  created_at: string
  item: {
    item_id: number
    name: string
    description: string
    price: number
  }
}

interface Pedido {
  pedido_id: number
  mesa: string
  cliente_nome: string
  status: string
  total: number
  observacoes?: string
  created_at: string
  updated_at: string
  pedido_itens: PedidoItem[]
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
  const pendentes = pedidos.filter(p => p.status === 'pendente').length
  const preparando = pedidos.filter(p => p.status === 'preparando').length
  const prontos = pedidos.filter(p => p.status === 'pronto').length
  const entregues = pedidos.filter(p => p.status === 'entregue').length

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'yellow'
      case 'preparando': return 'blue'
      case 'pronto': return 'green'
      case 'entregue': return 'gray'
      case 'cancelado': return 'red'
      default: return 'gray'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente': return ClockIcon
      case 'preparando': return ClockIcon
      case 'pronto': return CheckCircleIcon
      case 'entregue': return CheckCircleIcon
      case 'cancelado': return XCircleIcon
      default: return ClockIcon
    }
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* Header com métricas */}
      <div className="mb-8">
        <div className="mb-6">
          <Title className="text-3xl font-bold text-gray-900">Pedidos</Title>
          <Text className="text-gray-600 mt-2">Gerencie os pedidos dos clientes</Text>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-blue-600 font-medium">Total</Text>
                <Metric className="text-blue-900">{totalPedidos}</Metric>
              </div>
              <Badge color="blue" className="bg-blue-200 text-blue-800">
                <EyeIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-yellow-600 font-medium">Pendentes</Text>
                <Metric className="text-yellow-900">{pendentes}</Metric>
              </div>
              <Badge color="yellow" className="bg-yellow-200 text-yellow-800">
                <ClockIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-indigo-600 font-medium">Preparando</Text>
                <Metric className="text-indigo-900">{preparando}</Metric>
              </div>
              <Badge color="indigo" className="bg-indigo-200 text-indigo-800">
                <ClockIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-green-600 font-medium">Prontos</Text>
                <Metric className="text-green-900">{prontos}</Metric>
              </div>
              <Badge color="green" className="bg-green-200 text-green-800">
                <CheckCircleIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-gray-600 font-medium">Entregues</Text>
                <Metric className="text-gray-900">{entregues}</Metric>
              </div>
              <Badge color="gray" className="bg-gray-200 text-gray-800">
                <CheckCircleIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>
        </div>
      </div>

      {/* Tabela */}
      <Card className="bg-white shadow-xl border-0 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <Title className="text-xl font-semibold text-gray-800">Lista de Pedidos</Title>
          <Text className="text-gray-600 mt-1">Visualize e gerencie todos os pedidos</Text>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <Text className="ml-3 text-gray-500">Carregando pedidos...</Text>
            </div>
          ) : errorMessage ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <Text className="text-red-600 font-medium">{errorMessage}</Text>
            </div>
          ) : pedidos.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <EyeIcon className="w-8 h-8 text-gray-400" />
              </div>
              <Title className="text-gray-500 mb-2">Nenhum pedido encontrado</Title>
              <Text className="text-gray-400">Os pedidos aparecerão aqui quando os clientes fizerem pedidos</Text>
            </div>
          ) : (
            <PedidosTable pedidos={pedidos} onUpdate={fetchData} />
          )}
        </div>
      </Card>
    </main>
  )
} 