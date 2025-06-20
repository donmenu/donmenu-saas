'use client'

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react'
import { useEffect, useState } from 'react'
import { 
  CurrencyDollarIcon, 
  BanknotesIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface MetricasFinanceiras {
  totalReceitas: number
  totalDespesas: number
  lucroTotal: number
  margemLucro: number
  receitasHoje: number
  despesasHoje: number
  caixaAberto: boolean
  saldoCaixa: number
}

export default function FinanceiroPage() {
  const [metricas, setMetricas] = useState<MetricasFinanceiras>({
    totalReceitas: 0,
    totalDespesas: 0,
    lucroTotal: 0,
    margemLucro: 0,
    receitasHoje: 0,
    despesasHoje: 0,
    caixaAberto: false,
    saldoCaixa: 0
  })
  const [loading, setLoading] = useState(true)

  const fetchMetricas = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/financeiro/metricas')
      if (response.ok) {
        const data = await response.json()
        setMetricas(data)
      }
    } catch (error) {
      console.error('Erro ao buscar métricas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetricas()
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <Title className="text-3xl font-bold text-gray-900">Sistema Financeiro</Title>
            <Text className="text-gray-600 mt-2">Gerencie receitas, despesas e acompanhe o fluxo financeiro</Text>
          </div>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-green-600 font-medium">Receitas Totais</Text>
              <Metric className="text-green-900">
                {loading ? '...' : formatCurrency(metricas.totalReceitas)}
              </Metric>
              <Text className="text-green-700 text-sm">
                Hoje: {formatCurrency(metricas.receitasHoje)}
              </Text>
            </div>
            <Badge color="green" className="bg-green-200 text-green-800">
              <ArrowUpIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-red-600 font-medium">Despesas Totais</Text>
              <Metric className="text-red-900">
                {loading ? '...' : formatCurrency(metricas.totalDespesas)}
              </Metric>
              <Text className="text-red-700 text-sm">
                Hoje: {formatCurrency(metricas.despesasHoje)}
              </Text>
            </div>
            <Badge color="red" className="bg-red-200 text-red-800">
              <ArrowDownIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-blue-600 font-medium">Lucro Total</Text>
              <Metric className="text-blue-900">
                {loading ? '...' : formatCurrency(metricas.lucroTotal)}
              </Metric>
              <Text className="text-blue-700 text-sm">
                Margem: {formatPercent(metricas.margemLucro)}
              </Text>
            </div>
            <Badge color="blue" className="bg-blue-200 text-blue-800">
              <CurrencyDollarIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>

        <Card className={`border-0 shadow-lg ${metricas.caixaAberto ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
          <Flex alignItems="start">
            <div className="truncate">
              <Text className={`font-medium ${metricas.caixaAberto ? 'text-yellow-600' : 'text-gray-600'}`}>
                Status do Caixa
              </Text>
              <Metric className={metricas.caixaAberto ? 'text-yellow-900' : 'text-gray-900'}>
                {metricas.caixaAberto ? 'Aberto' : 'Fechado'}
              </Metric>
              <Text className={`text-sm ${metricas.caixaAberto ? 'text-yellow-700' : 'text-gray-700'}`}>
                Saldo: {formatCurrency(metricas.saldoCaixa)}
              </Text>
            </div>
            <Badge color={metricas.caixaAberto ? 'yellow' : 'gray'} className={`${metricas.caixaAberto ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>
              <BanknotesIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/dashboard/financeiro/caixa">
          <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-200 cursor-pointer group">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <BanknotesIcon className="w-6 h-6 text-blue-600" />
              </div>
              <Title className="text-lg font-semibold text-gray-900 mb-2">Gerenciar Caixa</Title>
              <Text className="text-gray-600 text-sm">
                Abrir, fechar e controlar o caixa
              </Text>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/financeiro/receitas">
          <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-200 cursor-pointer group">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <ArrowUpIcon className="w-6 h-6 text-green-600" />
              </div>
              <Title className="text-lg font-semibold text-gray-900 mb-2">Receitas</Title>
              <Text className="text-gray-600 text-sm">
                Registrar e visualizar receitas
              </Text>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/financeiro/despesas">
          <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-200 cursor-pointer group">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <ArrowDownIcon className="w-6 h-6 text-red-600" />
              </div>
              <Title className="text-lg font-semibold text-gray-900 mb-2">Despesas</Title>
              <Text className="text-gray-600 text-sm">
                Registrar e controlar despesas
              </Text>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/financeiro/relatorios">
          <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-200 cursor-pointer group">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <ChartBarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <Title className="text-lg font-semibold text-gray-900 mb-2">Relatórios</Title>
              <Text className="text-gray-600 text-sm">
                Análises e relatórios detalhados
              </Text>
            </div>
          </Card>
        </Link>
      </div>

      {/* Resumo Rápido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white shadow-xl border-0 rounded-xl">
          <div className="p-6 border-b border-gray-100">
            <Title className="text-xl font-semibold text-gray-800">Resumo do Mês</Title>
            <Text className="text-gray-600 mt-1">Principais indicadores financeiros</Text>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Text className="text-gray-600">Receitas</Text>
                <Text className="font-semibold text-green-600">
                  {formatCurrency(metricas.totalReceitas)}
                </Text>
              </div>
              <div className="flex justify-between items-center">
                <Text className="text-gray-600">Despesas</Text>
                <Text className="font-semibold text-red-600">
                  {formatCurrency(metricas.totalDespesas)}
                </Text>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <Text className="font-medium text-gray-900">Lucro Líquido</Text>
                  <Text className={`font-bold text-lg ${metricas.lucroTotal >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {formatCurrency(metricas.lucroTotal)}
                  </Text>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Text className="text-gray-600">Margem de Lucro</Text>
                  <Text className={`font-semibold ${metricas.margemLucro >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercent(metricas.margemLucro)}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white shadow-xl border-0 rounded-xl">
          <div className="p-6 border-b border-gray-100">
            <Title className="text-xl font-semibold text-gray-800">Status do Caixa</Title>
            <Text className="text-gray-600 mt-1">Informações sobre o caixa atual</Text>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Text className="text-gray-600">Status</Text>
                <Badge color={metricas.caixaAberto ? 'green' : 'red'}>
                  {metricas.caixaAberto ? 'Aberto' : 'Fechado'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text className="text-gray-600">Saldo Atual</Text>
                <Text className="font-semibold text-gray-900">
                  {formatCurrency(metricas.saldoCaixa)}
                </Text>
              </div>
              <div className="pt-4">
                <Link href="/dashboard/financeiro/caixa">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    icon={metricas.caixaAberto ? BanknotesIcon : PlusIcon}
                  >
                    {metricas.caixaAberto ? 'Gerenciar Caixa' : 'Abrir Caixa'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
} 