'use client'

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react'
import { useEffect, useState } from 'react'
import { PlusIcon, UsersIcon, EnvelopeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Search from '../../../search'
import UsersTable from './table'
import AddUser from './add-user'
import type { User } from '../../../../types/user'

export default function IndexPage({ searchParams }: { searchParams: { q: string } }) {
  const [users, setUsers] = useState<User[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const search = searchParams.q ?? ''

  const fetchData = async () => {
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch(`/api/users?search=${encodeURIComponent(search)}`)
      if (!response.ok) {
        throw new Error('Erro ao buscar dados')
      }
      const data = await response.json()
      setUsers(data)
    } catch (error: any) {
      console.error('Erro ao buscar dados:', error.message)
      setErrorMessage('Não foi possível conectar ao banco de dados.')
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleAddSuccess = () => {
    fetchData()
  }

  // Calcular métricas
  const totalUsers = users.length
  const usersWithEmail = users.filter(user => user.email).length
  const usersWithUsername = users.filter(user => user.username).length

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* Header com métricas */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <Title className="text-3xl font-bold text-gray-900">Usuários</Title>
            <Text className="text-gray-600 mt-2">Gerencie os usuários do sistema</Text>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            icon={PlusIcon}
          >
            Adicionar Usuário
          </Button>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-indigo-600 font-medium">Total de Usuários</Text>
                <Metric className="text-indigo-900">{totalUsers}</Metric>
              </div>
              <Badge color="indigo" className="bg-indigo-200 text-indigo-800">
                <UsersIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-blue-600 font-medium">Com Email</Text>
                <Metric className="text-blue-900">{usersWithEmail}</Metric>
              </div>
              <Badge color="blue" className="bg-blue-200 text-blue-800">
                <EnvelopeIcon className="w-4 h-4" />
              </Badge>
            </Flex>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
            <Flex alignItems="start">
              <div className="truncate">
                <Text className="text-purple-600 font-medium">Com Username</Text>
                <Metric className="text-purple-900">{usersWithUsername}</Metric>
              </div>
              <Badge color="purple" className="bg-purple-200 text-purple-800">
                <UserGroupIcon className="w-4 h-4" />
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
          <Title className="text-xl font-semibold text-gray-800">Lista de Usuários</Title>
          <Text className="text-gray-600 mt-1">Visualize e gerencie todos os usuários do sistema</Text>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <Text className="ml-3 text-gray-500">Carregando usuários...</Text>
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
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <UsersIcon className="w-8 h-8 text-gray-400" />
              </div>
              <Title className="text-gray-500 mb-2">Nenhum usuário encontrado</Title>
              <Text className="text-gray-400">Comece adicionando seu primeiro usuário</Text>
            </div>
          ) : (
            <UsersTable users={users} onUpdate={fetchData} />
          )}
        </div>
      </Card>

      <AddUser
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </main>
  )
}
