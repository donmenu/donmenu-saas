'use client'

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react'
import { useEffect, useState } from 'react'
import { 
  ArrowUpIcon, 
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import DashboardShell from '../../DashboardShell';

interface Categoria {
  categoria_id: number
  nome: string
  tipo: string
  descricao?: string
  cor?: string
}

interface Receita {
  receita_id: number
  caixa_id?: number
  categoria_id?: number
  pedido_id?: number
  descricao: string
  valor: number
  data_receita: string
  forma_pagamento?: string
  observacoes?: string
  created_at: string
  categoria?: Categoria
}

export default function ReceitasPage() {
  const [receitas, setReceitas] = useState<Receita[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [receitasResponse, categoriasResponse] = await Promise.all([
        fetch('/api/financeiro/receitas'),
        fetch('/api/financeiro/categorias?tipo=receita')
      ])
      
      if (receitasResponse.ok) {
        const receitasData = await receitasResponse.json()
        setReceitas(receitasData)
      }
      
      if (categoriasResponse.ok) {
        const categoriasData = await categoriasResponse.json()
        setCategorias(categoriasData)
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getFormaPagamentoText = (forma: string) => {
    switch (forma) {
      case 'dinheiro': return 'Dinheiro'
      case 'cartao': return 'Cartão'
      case 'pix': return 'PIX'
      case 'transferencia': return 'Transferência'
      default: return forma
    }
  }

  const getFormaPagamentoColor = (forma: string) => {
    switch (forma) {
      case 'dinheiro': return 'green'
      case 'cartao': return 'blue'
      case 'pix': return 'purple'
      case 'transferencia': return 'orange'
      default: return 'gray'
    }
  }

  // Calcular métricas
  const totalReceitas = receitas.reduce((sum, r) => sum + Number(r.valor), 0)
  const receitasHoje = receitas
    .filter(r => {
      const hoje = new Date()
      const dataReceita = new Date(r.data_receita)
      return dataReceita.toDateString() === hoje.toDateString()
    })
    .reduce((sum, r) => sum + Number(r.valor), 0)

  return (
    <DashboardShell>
      {/* Header */}
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <Title className="text-3xl font-bold text-gray-900">Receitas</Title>
              <Text className="text-gray-600 mt-2">Gerencie todas as receitas do estabelecimento</Text>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              icon={PlusIcon}
            >
              Nova Receita
            </Button>
          </div>

          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text className="text-green-600 font-medium">Total de Receitas</Text>
                  <Metric className="text-green-900">{formatCurrency(totalReceitas)}</Metric>
                </div>
                <Badge color="green" className="bg-green-200 text-green-800">
                  <ArrowUpIcon className="w-4 h-4" />
                </Badge>
              </Flex>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text className="text-blue-600 font-medium">Receitas Hoje</Text>
                  <Metric className="text-blue-900">{formatCurrency(receitasHoje)}</Metric>
                </div>
                <Badge color="blue" className="bg-blue-200 text-blue-800">
                  <ArrowUpIcon className="w-4 h-4" />
                </Badge>
              </Flex>
            </Card>
          </div>
        </div>

        {/* Lista de Receitas */}
        <Card className="bg-white shadow-xl border-0 rounded-xl">
          <div className="p-6 border-b border-gray-100">
            <Title className="text-xl font-semibold text-gray-800">Lista de Receitas</Title>
            <Text className="text-gray-600 mt-1">Visualize e gerencie todas as receitas registradas</Text>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <Text className="ml-3 text-gray-500">Carregando receitas...</Text>
              </div>
            ) : receitas.length === 0 ? (
              <div className="text-center py-12">
                <ArrowUpIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <Title className="text-gray-500 mb-2">Nenhuma receita encontrada</Title>
                <Text className="text-gray-400">Comece registrando sua primeira receita</Text>
              </div>
            ) : (
              <div className="space-y-4">
                {receitas.map((receita) => (
                  <div key={receita.receita_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <ArrowUpIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <Text className="font-medium text-gray-900">{receita.descricao}</Text>
                        <Text className="text-sm text-gray-600">
                          {receita.categoria?.nome || 'Sem categoria'} • {formatDate(receita.data_receita)}
                        </Text>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Text className="font-semibold text-green-600 text-lg">
                          {formatCurrency(receita.valor)}
                        </Text>
                        {receita.forma_pagamento && (
                          <Badge color={getFormaPagamentoColor(receita.forma_pagamento)}>
                            {getFormaPagamentoText(receita.forma_pagamento)}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="xs"
                          variant="secondary"
                          icon={EyeIcon}
                        >
                          Ver
                        </Button>
                        <Button
                          size="xs"
                          variant="secondary"
                          icon={PencilIcon}
                        >
                          Editar
                        </Button>
                        <Button
                          size="xs"
                          variant="secondary"
                          color="red"
                          icon={TrashIcon}
                        >
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Modal de Nova Receita */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200">
                <Title className="text-xl font-semibold text-gray-900">Nova Receita</Title>
                <Text className="text-gray-600 mt-1">Registre uma nova receita</Text>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Descrição da receita"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0,00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="">Selecione uma categoria</option>
                      {categorias.map((cat) => (
                        <option key={cat.categoria_id} value={cat.categoria_id}>
                          {cat.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Forma de Pagamento
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="">Selecione a forma de pagamento</option>
                      <option value="dinheiro">Dinheiro</option>
                      <option value="cartao">Cartão</option>
                      <option value="pix">PIX</option>
                      <option value="transferencia">Transferência</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data da Receita
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações (opcional)
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={3}
                      placeholder="Observações sobre a receita..."
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <Button
                    onClick={() => setIsAddModalOpen(false)}
                    variant="secondary"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Registrar Receita
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </DashboardShell>
  )
} 