'use client'

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react'
import { useEffect, useState, useCallback } from 'react'
import { PlusIcon, CubeIcon, CurrencyDollarIcon, ScaleIcon } from '@heroicons/react/24/outline'
import Search from '../../../search'
import SuppliesTable from './table-cardapio'
import AddSupply from './add-supply'
import type { Ingredient } from '../../../../types/ingredient'
import DashboardShell from '../DashboardShell';

export default function IndexPage({ searchParams }: { searchParams: { q: string } }) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const search = searchParams.q ?? ''

  const fetchData = useCallback(async () => {
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch(`/api/ingredients?search=${encodeURIComponent(search)}`)
      if (!response.ok) {
        throw new Error('Erro ao buscar dados')
      }
      const data = await response.json()
      setIngredients(data)
    } catch (error: any) {
      console.error('Erro ao buscar dados:', error.message)
      setErrorMessage('Não foi possível conectar ao banco de dados.')
    }

    setLoading(false)
  }, [search])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleAddSuccess = () => {
    fetchData()
  }

  // Calcular métricas
  const totalIngredients = ingredients.length
  const totalCost = ingredients.reduce((sum, ingredient) => sum + Number(ingredient.cost_per_unit), 0)
  const averageCost = totalIngredients > 0 ? totalCost / totalIngredients : 0

  return (
    <DashboardShell>
      {/* Header com métricas */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <Title className="text-3xl font-bold text-gray-900">Insumos</Title>
            <Text className="text-gray-600 mt-2">Gerencie os ingredientes e insumos do seu restaurante</Text>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            icon={PlusIcon}
          >
            Adicionar Insumo
          </Button>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-blue-600 font-medium">Total de Insumos</Text>
                <Metric className="text-blue-900">{totalIngredients}</Metric>
              </div>
              <Badge color="blue" className="bg-blue-200 text-blue-800">
                <CubeIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-green-600 font-medium">Custo Total</Text>
                <Metric className="text-green-900">
                  R$ {totalCost.toFixed(2)}
                </Metric>
              </div>
              <Badge color="green" className="bg-green-200 text-green-800">
                <CurrencyDollarIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-purple-600 font-medium">Custo Médio</Text>
                <Metric className="text-purple-900">
                  R$ {averageCost.toFixed(2)}
                </Metric>
              </div>
              <Badge color="purple" className="bg-purple-200 text-purple-800">
                <ScaleIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>
        </div>
      </div>
      
      {/* Barra de busca */}
      <div className="mb-6">
        <Search />
      </div>

      {/* Tabela */}
      <Card className="bg-white shadow-xl border-0 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <Title className="text-xl font-semibold text-gray-800">Lista de Insumos</Title>
          <Text className="text-gray-600 mt-1">Visualize e gerencie todos os ingredientes</Text>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <Text className="ml-3 text-gray-500">Carregando insumos...</Text>
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
          ) : ingredients.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <CubeIcon className="w-8 h-8 text-gray-400" />
              </div>
              <Title className="text-gray-500 mb-2">Nenhum insumo encontrado</Title>
              <Text className="text-gray-400">Comece adicionando seu primeiro insumo</Text>
            </div>
          ) : (
            <SuppliesTable ingredients={ingredients} onUpdate={fetchData} />
          )}
        </div>
      </Card>

      <AddSupply
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </DashboardShell>
  )
}
