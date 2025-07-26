'use client'

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react'
import { useEffect, useState, useCallback } from 'react'
import { Bars3Icon, CheckCircleIcon, ClockIcon, SparklesIcon, Cog6ToothIcon, ViewColumnsIcon, Squares2X2Icon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import Search from '../../../search'
import CardapiosTable from './table-cardapio'
import IntelligentAssistant from './intelligent-assistant'
import ManageMenus from './manage-menus'
import ManageCombos from './manage-combos'
import AddCardapio from './add-cardapio'
import Breadcrumb from './breadcrumb'
import type { Cardapio } from '../../../../types/cardapio'
import DashboardShell from '../DashboardShell';

export default function IndexPage({ searchParams }: { searchParams: { q: string } }) {
  const [cardapios, setCardapios] = useState<Cardapio[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [isManageMenusOpen, setIsManageMenusOpen] = useState(false)
  const [isManageCombosOpen, setIsManageCombosOpen] = useState(false)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [selectedMenuForProduct, setSelectedMenuForProduct] = useState<number | null>(null)

  const search = searchParams.q ?? ''

  const fetchData = useCallback(async () => {
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch(`/api/cardapios?search=${encodeURIComponent(search)}`)
      if (!response.ok) {
        throw new Error('Erro ao buscar dados')
      }
      const data = await response.json()
      setCardapios(data)
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

  const handleAddProduct = useCallback((menuId: number) => {
    setSelectedMenuForProduct(menuId)
    setIsAddProductOpen(true)
    setIsManageMenusOpen(false)
  }, [])

  // Calcular métricas
  const totalCardapios = cardapios.length
  const ativos = cardapios.filter(c => c.active).length
  const inativos = cardapios.filter(c => !c.active).length

  return (
    <DashboardShell>
      <div className="p-6">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Cardápio', href: '/dashboard/cardapio', current: true }
          ]}
        />

        {/* Header com métricas */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <Title className="text-3xl font-bold text-gray-900 dark:text-white">Produtos do Cardápio</Title>
              <Text className="text-gray-600 dark:text-gray-300 mt-2">Gerencie os itens individuais do seu cardápio</Text>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => window.location.href = '/dashboard/cardapio/modern'}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                icon={Squares2X2Icon}
              >
                Visualização Moderna
              </Button>
              <Button
                onClick={() => window.location.href = '/dashboard/cardapio/menus'}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                icon={ViewColumnsIcon}
              >
                Ver Cardápios
              </Button>
              <Button
                onClick={() => setIsManageMenusOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                icon={Cog6ToothIcon}
              >
                Gerenciar Cardápios
              </Button>
              <Button
                onClick={() => setIsManageCombosOpen(true)}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                icon={ShoppingBagIcon}
              >
                Gerenciar Combos
              </Button>
              <Button
                onClick={() => setIsAssistantOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                icon={SparklesIcon}
              >
                Assistente IA
              </Button>
            </div>
          </div>

          {/* Cards de métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0 shadow-lg">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text className="text-green-600 dark:text-green-400 font-medium">Total de Itens</Text>
                  <Metric className="text-green-900 dark:text-green-300">{totalCardapios}</Metric>
                </div>
                <Badge color="green" className="bg-green-200 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  <Bars3Icon className="w-4 h-4" />
                </Badge>
              </Flex>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 shadow-lg">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text className="text-blue-600 dark:text-blue-400 font-medium">Itens Ativos</Text>
                  <Metric className="text-blue-900 dark:text-blue-300">{ativos}</Metric>
                </div>
                <Badge color="blue" className="bg-blue-200 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  <CheckCircleIcon className="w-4 h-4" />
                </Badge>
              </Flex>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0 shadow-lg">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text className="text-orange-600 dark:text-orange-400 font-medium">Itens Inativos</Text>
                  <Metric className="text-orange-900 dark:text-orange-300">{inativos}</Metric>
                </div>
                <Badge color="orange" className="bg-orange-200 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                  <ClockIcon className="w-4 h-4" />
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
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <Title className="text-xl font-semibold text-gray-800 dark:text-white">Lista de Produtos</Title>
            <Text className="text-gray-600 dark:text-gray-300 mt-1">Visualize e gerencie todos os itens individuais</Text>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <Text className="ml-3 text-gray-500 dark:text-gray-400">Carregando cardápios...</Text>
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
            ) : cardapios.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                  <Bars3Icon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <Title className="text-gray-500 dark:text-gray-400 mb-2">Nenhum item encontrado</Title>
                <Text className="text-gray-400 dark:text-gray-500">Comece adicionando seu primeiro item ao cardápio</Text>
              </div>
            ) : (
              <CardapiosTable cardapios={cardapios} onUpdate={fetchData} />
            )}
          </div>
        </Card>



        <IntelligentAssistant
          isOpen={isAssistantOpen}
          onClose={() => setIsAssistantOpen(false)}
          onProductCreated={handleAddSuccess}
        />

        <ManageMenus
          isOpen={isManageMenusOpen}
          onClose={() => setIsManageMenusOpen(false)}
                  onAddProduct={handleAddProduct}
      />

      <ManageCombos
        isOpen={isManageCombosOpen}
        onClose={() => setIsManageCombosOpen(false)}
      />

      <AddCardapio
          isOpen={isAddProductOpen}
          onClose={() => {
            setIsAddProductOpen(false)
            setSelectedMenuForProduct(null)
          }}
          onSuccess={() => {
            setIsAddProductOpen(false)
            setSelectedMenuForProduct(null)
            handleAddSuccess()
          }}
          preSelectedMenuId={selectedMenuForProduct}
        />
      </div>
    </DashboardShell>
  )
}
