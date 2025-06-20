'use client'

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react'
import { useEffect, useState } from 'react'
import { 
  ArrowDownIcon, 
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

interface Categoria {
  categoria_id: number
  nome: string
  tipo: string
  descricao?: string
  cor?: string
}

interface Despesa {
  despesa_id: number
  caixa_id?: number
  categoria_id?: number
  descricao: string
  valor: number
  data_despesa: string
  forma_pagamento?: string
  fornecedor?: string
  nota_fiscal?: string
  observacoes?: string
  created_at: string
  categoria?: Categoria
}

export default function DespesasPage() {
  const [despesas, setDespesas] = useState<Despesa[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [despesasResponse, categoriasResponse] = await Promise.all([
        fetch('/api/financeiro/despesas'),
        fetch('/api/financeiro/categorias?tipo=despesa')
      ])
      
      if (despesasResponse.ok) {
        const despesasData = await despesasResponse.json()
        setDespesas(despesasData)
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
      case 'boleto': return 'Boleto'
      default: return forma
    }
  }

  const getFormaPagamentoColor = (forma: string) => {
    switch (forma) {
      case 'dinheiro': return 'green'
      case 'cartao': return 'blue'
      case 'pix': return 'purple'
      case 'transferencia': return 'orange'
      case 'boleto': return 'yellow'
      default: return 'gray'
    }
  }

  // Calcular métricas
  const totalDespesas = despesas.reduce((sum, d) => sum + Number(d.valor), 0)
  const despesasHoje = despesas
    .filter(d => {
      const hoje = new Date()
      const dataDespesa = new Date(d.data_despesa)
      return dataDespesa.toDateString() === hoje.toDateString()
    })
    .reduce((sum, d) => sum + Number(d.valor), 0)

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <Title className="text-3xl font-bold text-gray-900">Despesas</Title>
            <Text className="text-gray-600 mt-2">Gerencie todas as despesas do estabelecimento</Text>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
            icon={PlusIcon}
          >
            Nova Despesa
          </Button>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-red-600 font-medium">Total de Despesas</Text>
                <Metric className="text-red-900">{formatCurrency(totalDespesas)}</Metric>
              </div>
              <Badge color="red" className="bg-red-200 text-red-800">
                <ArrowDownIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-orange-600 font-medium">Despesas Hoje</Text>
                <Metric className="text-orange-900">{formatCurrency(despesasHoje)}</Metric>
              </div>
              <Badge color="orange" className="bg-orange-200 text-orange-800">
                <ArrowDownIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>
        </div>
      </div>

      {/* Lista de Despesas */}
      <Card className="bg-white shadow-xl border-0 rounded-xl">
        <div className="p-6 border-b border-gray-100">
          <Title className="text-xl font-semibold text-gray-800">Lista de Despesas</Title>
          <Text className="text-gray-600 mt-1">Visualize e gerencie todas as despesas registradas</Text>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <Text className="ml-3 text-gray-500">Carregando despesas...</Text>
            </div>
          ) : despesas.length === 0 ? (
            <div className="text-center py-12">
              <ArrowDownIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <Title className="text-gray-500 mb-2">Nenhuma despesa encontrada</Title>
              <Text className="text-gray-400">Comece registrando sua primeira despesa</Text>
            </div>
          ) : (
            <div className="space-y-4">
              {despesas.map((despesa) => (
                <div key={despesa.despesa_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <ArrowDownIcon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <Text className="font-medium text-gray-900">{despesa.descricao}</Text>
                      <Text className="text-sm text-gray-600">
                        {despesa.categoria?.nome || 'Sem categoria'} • {formatDate(despesa.data_despesa)}
                        {despesa.fornecedor && ` • ${despesa.fornecedor}`}
                      </Text>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Text className="font-semibold text-red-600 text-lg">
                        {formatCurrency(despesa.valor)}
                      </Text>
                      {despesa.forma_pagamento && (
                        <Badge color={getFormaPagamentoColor(despesa.forma_pagamento)}>
                          {getFormaPagamentoText(despesa.forma_pagamento)}
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

      {/* Modal de Nova Despesa */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <Title className="text-xl font-semibold text-gray-900">Nova Despesa</Title>
              <Text className="text-gray-600 mt-1">Registre uma nova despesa</Text>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Descrição da despesa"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="0,00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
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
                    Fornecedor
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Nome do fornecedor"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número da Nota Fiscal
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Número da NF"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Forma de Pagamento
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="">Selecione a forma de pagamento</option>
                    <option value="dinheiro">Dinheiro</option>
                    <option value="cartao">Cartão</option>
                    <option value="pix">PIX</option>
                    <option value="transferencia">Transferência</option>
                    <option value="boleto">Boleto</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data da Despesa
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações (opcional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                    placeholder="Observações sobre a despesa..."
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
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Registrar Despesa
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
} 