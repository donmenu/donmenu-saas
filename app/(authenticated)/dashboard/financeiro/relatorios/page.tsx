'use client'

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react'
import { useEffect, useState } from 'react'
import { 
  ChartBarIcon, 
  DocumentArrowDownIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

interface RelatorioData {
  periodo: string
  receitas: number
  despesas: number
  lucro: number
  margem: number
}

interface CategoriaData {
  nome: string
  valor: number
  percentual: number
  cor: string
}

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState('30dias')
  const [loading, setLoading] = useState(true)
  const [relatorioData, setRelatorioData] = useState<RelatorioData[]>([])
  const [receitasPorCategoria, setReceitasPorCategoria] = useState<CategoriaData[]>([])
  const [despesasPorCategoria, setDespesasPorCategoria] = useState<CategoriaData[]>([])
  const [metricasGerais, setMetricasGerais] = useState({
    totalReceitas: 0,
    totalDespesas: 0,
    lucroTotal: 0,
    margemLucro: 0,
    mediaReceitasDiarias: 0,
    mediaDespesasDiarias: 0
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/financeiro/relatorios?periodo=${periodo}`)
      if (response.ok) {
        const data = await response.json()
        setRelatorioData(data.relatorioData)
        setReceitasPorCategoria(data.receitasPorCategoria)
        setDespesasPorCategoria(data.despesasPorCategoria)
        setMetricasGerais(data.metricasGerais)
      }
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#6B7280', '#EC4899']

  const exportarRelatorio = () => {
    // Implementar exportação para PDF/Excel
    alert('Funcionalidade de exportação será implementada em breve!')
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <Title className="text-3xl font-bold text-gray-900">Relatórios Financeiros</Title>
            <Text className="text-gray-600 mt-2">Análises detalhadas e relatórios financeiros</Text>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button
              onClick={exportarRelatorio}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
              icon={DocumentArrowDownIcon}
            >
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Filtros de período */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={periodo === '7dias' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setPeriodo('7dias')}
          >
            7 Dias
          </Button>
          <Button
            variant={periodo === '30dias' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setPeriodo('30dias')}
          >
            30 Dias
          </Button>
          <Button
            variant={periodo === '90dias' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setPeriodo('90dias')}
          >
            90 Dias
          </Button>
        </div>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-green-600 font-medium">Receitas Totais</Text>
              <Metric className="text-green-900">{formatCurrency(metricasGerais.totalReceitas)}</Metric>
              <Text className="text-green-700 text-sm">
                Média diária: {formatCurrency(metricasGerais.mediaReceitasDiarias)}
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
              <Metric className="text-red-900">{formatCurrency(metricasGerais.totalDespesas)}</Metric>
              <Text className="text-red-700 text-sm">
                Média diária: {formatCurrency(metricasGerais.mediaDespesasDiarias)}
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
              <Metric className="text-blue-900">{formatCurrency(metricasGerais.lucroTotal)}</Metric>
              <Text className="text-blue-700 text-sm">
                Margem: {formatPercent(metricasGerais.margemLucro)}
              </Text>
            </div>
            <Badge color="blue" className="bg-blue-200 text-blue-800">
              <CurrencyDollarIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de Barras - Evolução */}
        <Card className="bg-white shadow-xl border-0 rounded-xl">
          <div className="p-6 border-b border-gray-100">
            <Title className="text-xl font-semibold text-gray-800">Evolução Financeira</Title>
            <Text className="text-gray-600 mt-1">Receitas, despesas e lucro ao longo do tempo</Text>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <Text className="ml-3 text-gray-500">Carregando dados...</Text>
              </div>
            ) : relatorioData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={relatorioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Período: ${label}`}
                  />
                  <Bar dataKey="receitas" fill="#10B981" name="Receitas" />
                  <Bar dataKey="despesas" fill="#EF4444" name="Despesas" />
                  <Bar dataKey="lucro" fill="#3B82F6" name="Lucro" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12">
                <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <Text className="text-gray-500">Nenhum dado disponível</Text>
              </div>
            )}
          </div>
        </Card>

        {/* Gráfico de Pizza - Receitas por Categoria */}
        <Card className="bg-white shadow-xl border-0 rounded-xl">
          <div className="p-6 border-b border-gray-100">
            <Title className="text-xl font-semibold text-gray-800">Receitas por Categoria</Title>
            <Text className="text-gray-600 mt-1">Distribuição das receitas por categoria</Text>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <Text className="ml-3 text-gray-500">Carregando dados...</Text>
              </div>
            ) : receitasPorCategoria.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={receitasPorCategoria}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ nome, percentual }) => `${nome} (${percentual.toFixed(1)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {receitasPorCategoria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12">
                <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <Text className="text-gray-500">Nenhum dado disponível</Text>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Gráfico de Pizza - Despesas por Categoria */}
      <Card className="bg-white shadow-xl border-0 rounded-xl mb-8">
        <div className="p-6 border-b border-gray-100">
          <Title className="text-xl font-semibold text-gray-800">Despesas por Categoria</Title>
          <Text className="text-gray-600 mt-1">Distribuição das despesas por categoria</Text>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <Text className="ml-3 text-gray-500">Carregando dados...</Text>
            </div>
          ) : despesasPorCategoria.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={despesasPorCategoria}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ nome, percentual }) => `${nome} (${percentual.toFixed(1)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {despesasPorCategoria.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12">
              <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <Text className="text-gray-500">Nenhum dado disponível</Text>
            </div>
          )}
        </div>
      </Card>

      {/* Tabela de Resumo */}
      <Card className="bg-white shadow-xl border-0 rounded-xl">
        <div className="p-6 border-b border-gray-100">
          <Title className="text-xl font-semibold text-gray-800">Resumo por Período</Title>
          <Text className="text-gray-600 mt-1">Detalhamento financeiro por período</Text>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <Text className="ml-3 text-gray-500">Carregando dados...</Text>
            </div>
          ) : relatorioData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Período</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Receitas</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Despesas</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Lucro</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Margem</th>
                  </tr>
                </thead>
                <tbody>
                  {relatorioData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{item.periodo}</td>
                      <td className="py-3 px-4 text-right text-green-600 font-medium">
                        {formatCurrency(item.receitas)}
                      </td>
                      <td className="py-3 px-4 text-right text-red-600 font-medium">
                        {formatCurrency(item.despesas)}
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        item.lucro >= 0 ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        {formatCurrency(item.lucro)}
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        item.margem >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatPercent(item.margem)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <Text className="text-gray-500">Nenhum dado disponível</Text>
            </div>
          )}
        </div>
      </Card>
    </main>
  )
} 