'use client'

import { useEffect, useState } from 'react'
import { Card, Title, Text, Metric, Flex, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import DashboardShell from '../DashboardShell';

interface ProdutoCMV {
  nome: string
  vendas: number
  custo_unitario: number
  custo_total: number
  receita: number
  cmv: number
}

interface EvolucaoCMV {
  data: string
  cmv: number
}

const periodos = [
  { label: '7 dias', value: '7dias' },
  { label: '30 dias', value: '30dias' },
  { label: '90 dias', value: '90dias' },
]

export default function CMVPage() {
  const [cmvGeral, setCmvGeral] = useState(0)
  const [faturamento, setFaturamento] = useState(0)
  const [custoTotal, setCustoTotal] = useState(0)
  const [produtos, setProdutos] = useState<ProdutoCMV[]>([])
  const [loading, setLoading] = useState(true)
  const [periodo, setPeriodo] = useState('30dias')
  const [evolucao, setEvolucao] = useState<EvolucaoCMV[]>([])
  const [loadingEvolucao, setLoadingEvolucao] = useState(true)

  useEffect(() => {
    async function fetchCMV() {
      setLoading(true)
      const res = await fetch(`/api/cmv?periodo=${periodo}`)
      const data = await res.json()
      setCmvGeral(data.cmvGeral)
      setFaturamento(data.faturamento)
      setCustoTotal(data.custoTotal)
      setProdutos(data.produtos)
      setLoading(false)
    }
    fetchCMV()
  }, [periodo])

  useEffect(() => {
    async function fetchEvolucao() {
      setLoadingEvolucao(true)
      // Simulação: gere dados fake para o gráfico
      // No futuro, troque por fetch('/api/cmv-evolucao?periodo=...')
      const dias = periodo === '7dias' ? 7 : periodo === '90dias' ? 90 : 30
      const hoje = new Date()
      const dados: EvolucaoCMV[] = []
      for (let i = dias - 1; i >= 0; i--) {
        const d = new Date(hoje)
        d.setDate(hoje.getDate() - i)
        dados.push({
          data: d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
          cmv: Math.random() * 40 + 20 // Simulação: 20% a 60%
        })
      }
      setEvolucao(dados)
      setLoadingEvolucao(false)
    }
    fetchEvolucao()
  }, [periodo])

  return (
    <DashboardShell>
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Title className="text-3xl font-bold mb-8 text-gray-900">Controle de CMV</Title>

        {/* Filtros de período */}
        <div className="flex space-x-2 mb-6">
          {periodos.map((p) => (
            <Button
              key={p.value}
              variant={periodo === p.value ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setPeriodo(p.value)}
              disabled={loading}
            >
              {p.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div>
                <Text className="text-blue-600 font-medium">CMV Geral</Text>
                <Metric className="text-blue-900">{loading ? '...' : `${cmvGeral.toFixed(1)}%`}</Metric>
              </div>
            </Flex>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div>
                <Text className="text-green-600 font-medium">Faturamento</Text>
                <Metric className="text-green-900">{loading ? '...' : faturamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Metric>
              </div>
            </Flex>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div>
                <Text className="text-orange-600 font-medium">Custo Total</Text>
                <Metric className="text-orange-900">{loading ? '...' : custoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Metric>
              </div>
            </Flex>
          </Card>
        </div>

        {/* Gráfico de evolução do CMV */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-0 shadow-lg">
          <Title className="text-lg font-semibold text-gray-800 mb-2">Evolução do CMV</Title>
          {loadingEvolucao ? (
            <Text className="text-gray-500">Carregando gráfico...</Text>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={evolucao} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                <Line type="monotone" dataKey="cmv" stroke="#2563eb" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card className="bg-white shadow-xl border-0 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <Title className="text-xl font-semibold text-gray-800">CMV por Produto</Title>
            <Text className="text-gray-600 mt-1">Veja o detalhamento do custo de cada item vendido</Text>
          </div>
          <div className="p-6 overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Produto</TableHeaderCell>
                  <TableHeaderCell>Vendas</TableHeaderCell>
                  <TableHeaderCell>Custo Unitário</TableHeaderCell>
                  <TableHeaderCell>Custo Total</TableHeaderCell>
                  <TableHeaderCell>Receita</TableHeaderCell>
                  <TableHeaderCell>CMV (%)</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {produtos.map((p) => (
                  <TableRow key={p.nome}>
                    <TableCell>{p.nome}</TableCell>
                    <TableCell>{p.vendas}</TableCell>
                    <TableCell>{p.custo_unitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                    <TableCell>{p.custo_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                    <TableCell>{p.receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                    <TableCell className={p.cmv > 35 ? 'text-red-600 font-bold' : ''}>{p.cmv.toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </DashboardShell>
  )
} 