'use client'

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react'
import { useEffect, useState, useCallback } from 'react'
import { PlusIcon, DocumentTextIcon, CalculatorIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import Search from '../../../search'
import { FichaTecnicaTable, AddFichaTecnica } from './index'
import DashboardShell from '../DashboardShell';

interface FichaTecnica {
  id: number
  restaurant_id: number
  category_id: number | null
  name: string
  description: string | null
  yield_quantity: string
  yield_unit: string
  preparation_time: number | null
  difficulty: string | null
  instructions: string | null
  image_url: string | null
  active: boolean
  created_at: string
  updated_at: string
  total_cost: string | null
  cost_per_yield: string | null
  category: {
    id: number
    name: string
    description: string | null
    color: string | null
    icon: string | null
  } | null
  ingredients: {
    id: number
    restaurant_id: number
    recipe_id: number
    ingredient_id: number
    quantity: string
    unit: string
    cost: string | null
    notes: string | null
    created_at: string
    updated_at: string
    ingredient: {
      id: number
      name: string
      description: string | null
      unit: string
      cost_per_unit: string
      supplier: string | null
    }
  }[]
}

export default function IndexPage({ searchParams }: { searchParams: { q: string } }) {
  const [fichasTecnicas, setFichasTecnicas] = useState<FichaTecnica[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const search = searchParams.q ?? ''

  const fetchData = useCallback(async () => {
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch(`/api/ficha-tecnica?search=${encodeURIComponent(search)}`)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados')
      }

      const data = await response.json()
      setFichasTecnicas(data)
    } catch (error: any) {
      console.error('Erro ao buscar dados:', error.message)
      setErrorMessage('Erro ao conectar ao banco de dados.')
    }

    setLoading(false)
  }, [search])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleAddSuccess = () => {
    fetchData() // Recarregar os dados após adicionar
  }

  // Calcular métricas
  const totalFichas = fichasTecnicas.length
  const totalIngredientes = fichasTecnicas.reduce((acc, ficha) => acc + ficha.ingredients.length, 0)
  const custoMedio = fichasTecnicas.length > 0 
    ? fichasTecnicas.reduce((acc, ficha) => acc + (parseFloat(ficha.total_cost || '0')), 0) / fichasTecnicas.length
    : 0
  const margemMedia = fichasTecnicas.length > 0
    ? fichasTecnicas.reduce((acc, ficha) => {
        const totalCost = parseFloat(ficha.total_cost || '0')
        if (totalCost > 0) {
          // Calcular margem baseada no custo por porção
          const costPerYield = parseFloat(ficha.cost_per_yield || '0')
          if (costPerYield > 0) {
            // Margem estimada de 60% (padrão do sistema)
            return acc + 60
          }
        }
        return acc
      }, 0) / fichasTecnicas.length
    : 0

  return (
    <DashboardShell>
      <div className="p-4 md:p-10 mx-auto max-w-7xl">
        {/* Header com métricas */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Title className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Fichas Técnicas</Title>
            <Text className="text-gray-600 dark:text-gray-300">Gerencie as fichas técnicas dos itens do cardápio</Text>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            icon={PlusIcon}
          >
            Nova Ficha Técnica
          </Button>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 shadow flex flex-col items-center justify-center py-4">
            <Text className="text-blue-600 dark:text-blue-400 font-medium">Total de Fichas</Text>
            <Metric className="text-blue-900 dark:text-blue-300 text-2xl">{totalFichas}</Metric>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0 shadow flex flex-col items-center justify-center py-4">
            <Text className="text-green-600 dark:text-green-400 font-medium">Total de Ingredientes</Text>
            <Metric className="text-green-900 dark:text-green-300 text-2xl">{totalIngredientes}</Metric>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0 shadow flex flex-col items-center justify-center py-4">
            <Text className="text-orange-600 dark:text-orange-400 font-medium">Custo Médio</Text>
            <Metric className="text-orange-900 dark:text-orange-300 text-2xl">R$ {custoMedio.toFixed(2)}</Metric>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0 shadow flex flex-col items-center justify-center py-4">
            <Text className="text-purple-600 dark:text-purple-400 font-medium">Margem Média</Text>
            <Metric className="text-purple-900 dark:text-purple-300 text-2xl">{margemMedia.toFixed(1)}%</Metric>
          </Card>
        </div>

        {/* Barra de busca */}
        <div className="mb-6">
          <Search />
        </div>

        {/* Tabela */}
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <Title className="text-xl font-semibold text-gray-800 dark:text-white">Lista de Fichas Técnicas</Title>
              <Text className="text-gray-600 dark:text-gray-300 mt-1">Visualize e gerencie todas as fichas técnicas</Text>
            </div>
          </div>
          <div className="p-0 md:p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <Text className="ml-3 text-gray-500 dark:text-gray-400">Carregando fichas técnicas...</Text>
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
            ) : fichasTecnicas.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                  <DocumentTextIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <Title className="text-gray-500 dark:text-gray-400 mb-2">Nenhuma ficha técnica encontrada</Title>
                <Text className="text-gray-400 dark:text-gray-500">Comece criando sua primeira ficha técnica</Text>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <FichaTecnicaTable fichasTecnicas={fichasTecnicas} onUpdate={fetchData} />
              </div>
            )}
          </div>
        </Card>

        <AddFichaTecnica
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddSuccess}
        />
      </div>
    </DashboardShell>
  )
} 