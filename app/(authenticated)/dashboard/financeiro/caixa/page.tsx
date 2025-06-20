'use client'

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react'
import { useEffect, useState } from 'react'
import { 
  BanknotesIcon, 
  LockClosedIcon, 
  LockOpenIcon,
  PlusIcon,
  MinusIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

interface Caixa {
  caixa_id: number
  data_abertura: string
  data_fechamento?: string
  valor_inicial: number
  valor_final?: number
  observacoes?: string
  status: string
  created_at: string
  updated_at: string
}

interface CaixaDetalhes {
  caixa: Caixa
  totalReceitas: number
  totalDespesas: number
  saldo: number
}

export default function CaixaPage() {
  const [caixas, setCaixas] = useState<Caixa[]>([])
  const [caixaAtual, setCaixaAtual] = useState<CaixaDetalhes | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOpenModalOpen, setIsOpenModalOpen] = useState(false)
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/financeiro/caixa')
      if (response.ok) {
        const data = await response.json()
        setCaixas(data.caixas)
        setCaixaAtual(data.caixaAtual)
      }
    } catch (error) {
      console.error('Erro ao buscar dados do caixa:', error)
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    return status === 'aberto' ? 'green' : 'gray'
  }

  const getStatusText = (status: string) => {
    return status === 'aberto' ? 'Aberto' : 'Fechado'
  }

  const getStatusIcon = (status: string) => {
    return status === 'aberto' ? LockOpenIcon : LockClosedIcon
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <Title className="text-3xl font-bold text-gray-900">Gerenciamento de Caixa</Title>
            <Text className="text-gray-600 mt-2">Controle de abertura, fechamento e movimentações do caixa</Text>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            {!caixaAtual && (
              <Button
                onClick={() => setIsOpenModalOpen(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                icon={LockOpenIcon}
              >
                Abrir Caixa
              </Button>
            )}
            {caixaAtual && (
              <Button
                onClick={() => setIsCloseModalOpen(true)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                icon={LockClosedIcon}
              >
                Fechar Caixa
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Status do Caixa Atual */}
      {caixaAtual && (
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <LockOpenIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Title className="text-xl font-semibold text-green-900">Caixa Aberto</Title>
                  <Text className="text-green-700">
                    Aberto em {formatDateTime(caixaAtual.caixa.data_abertura)}
                  </Text>
                </div>
              </div>
              <Button
                onClick={() => setIsViewModalOpen(true)}
                variant="secondary"
                icon={EyeIcon}
              >
                Ver Detalhes
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div className="text-center">
                <Text className="text-green-700 font-medium">Valor Inicial</Text>
                <Metric className="text-green-900">{formatCurrency(caixaAtual.caixa.valor_inicial)}</Metric>
              </div>
              <div className="text-center">
                <Text className="text-blue-700 font-medium">Total Receitas</Text>
                <Metric className="text-blue-900">{formatCurrency(caixaAtual.totalReceitas)}</Metric>
              </div>
              <div className="text-center">
                <Text className="text-red-700 font-medium">Total Despesas</Text>
                <Metric className="text-red-900">{formatCurrency(caixaAtual.totalDespesas)}</Metric>
              </div>
              <div className="text-center">
                <Text className="text-purple-700 font-medium">Saldo Atual</Text>
                <Metric className="text-purple-900">{formatCurrency(caixaAtual.saldo)}</Metric>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Lista de Caixas */}
      <Card className="bg-white shadow-xl border-0 rounded-xl">
        <div className="p-6 border-b border-gray-100">
          <Title className="text-xl font-semibold text-gray-800">Histórico de Caixas</Title>
          <Text className="text-gray-600 mt-1">Visualize todos os caixas abertos e fechados</Text>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <Text className="ml-3 text-gray-500">Carregando caixas...</Text>
            </div>
          ) : caixas.length === 0 ? (
            <div className="text-center py-12">
              <BanknotesIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <Title className="text-gray-500 mb-2">Nenhum caixa encontrado</Title>
              <Text className="text-gray-400">Abra o primeiro caixa para começar</Text>
            </div>
          ) : (
            <div className="space-y-4">
              {caixas.map((caixa) => {
                const StatusIcon = getStatusIcon(caixa.status)
                return (
                  <div key={caixa.caixa_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        caixa.status === 'aberto' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <StatusIcon className={`w-5 h-5 ${
                          caixa.status === 'aberto' ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <Text className="font-medium text-gray-900">
                          Caixa #{caixa.caixa_id}
                        </Text>
                        <Text className="text-sm text-gray-600">
                          {formatDateTime(caixa.data_abertura)}
                        </Text>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Text className="text-sm text-gray-600">Valor Inicial</Text>
                        <Text className="font-medium text-gray-900">
                          {formatCurrency(caixa.valor_inicial)}
                        </Text>
                      </div>
                      
                      {caixa.valor_final && (
                        <div className="text-right">
                          <Text className="text-sm text-gray-600">Valor Final</Text>
                          <Text className="font-medium text-gray-900">
                            {formatCurrency(caixa.valor_final)}
                          </Text>
                        </div>
                      )}
                      
                      <Badge color={getStatusColor(caixa.status)}>
                        {getStatusText(caixa.status)}
                      </Badge>
                      
                      <Button
                        size="xs"
                        variant="secondary"
                        onClick={() => {
                          // Implementar visualização detalhada
                        }}
                        icon={EyeIcon}
                      >
                        Ver
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Card>

      {/* Modal de Abrir Caixa */}
      {isOpenModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <Title className="text-xl font-semibold text-gray-900">Abrir Caixa</Title>
              <Text className="text-gray-600 mt-1">Defina o valor inicial do caixa</Text>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor Inicial (R$)
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
                    Observações (opcional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                    placeholder="Observações sobre a abertura do caixa..."
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={() => setIsOpenModalOpen(false)}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Abrir Caixa
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Fechar Caixa */}
      {isCloseModalOpen && caixaAtual && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <Title className="text-xl font-semibold text-gray-900">Fechar Caixa</Title>
              <Text className="text-gray-600 mt-1">Confirme o fechamento do caixa atual</Text>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Text className="text-gray-600">Valor Inicial:</Text>
                      <Text className="font-medium">{formatCurrency(caixaAtual.caixa.valor_inicial)}</Text>
                    </div>
                    <div>
                      <Text className="text-gray-600">Total Receitas:</Text>
                      <Text className="font-medium text-green-600">{formatCurrency(caixaAtual.totalReceitas)}</Text>
                    </div>
                    <div>
                      <Text className="text-gray-600">Total Despesas:</Text>
                      <Text className="font-medium text-red-600">{formatCurrency(caixaAtual.totalDespesas)}</Text>
                    </div>
                    <div>
                      <Text className="text-gray-600">Saldo Final:</Text>
                      <Text className="font-medium text-blue-600">{formatCurrency(caixaAtual.saldo)}</Text>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações (opcional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                    placeholder="Observações sobre o fechamento do caixa..."
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={() => setIsCloseModalOpen(false)}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Fechar Caixa
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
} 