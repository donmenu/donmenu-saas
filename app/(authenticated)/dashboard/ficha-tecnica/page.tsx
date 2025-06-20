'use client'

import { Card, Title, Text, Button } from '@tremor/react'
import { useEffect, useState } from 'react'
import Search from '../../../search'
import { FichaTecnicaTable, AddFichaTecnica } from './index'

interface FichaTecnica {
  ficha_id: number
  item_id: number
  yield: number | null
  total_cost: number | null
  price_suggestion: number | null
  created_at: string
  item: {
    item_id: number
    name: string
    description: string
    price: number
    category: {
      category_id: number
      name: string
    }
  }
  ficha_ingredientes: {
    id: number
    quantity: number
    ingredient: {
      ingredient_id: number
      name: string
      unit: string
      cost_per_unit: number
    }
  }[]
}

export default function IndexPage({ searchParams }: { searchParams: { q: string } }) {
  const [fichasTecnicas, setFichasTecnicas] = useState<FichaTecnica[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const search = searchParams.q ?? ''

  const fetchData = async () => {
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
  }

  useEffect(() => {
    fetchData()
  }, [search])

  const handleAddSuccess = () => {
    fetchData() // Recarregar os dados após adicionar
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title>Fichas Técnicas</Title>
          <Text>Gerencie as fichas técnicas dos itens do cardápio</Text>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          + Nova Ficha Técnica
        </Button>
      </div>
      
      <Search />
      <Card className="mt-6">
        {loading ? (
          <Text className="text-center text-gray-400">Carregando...</Text>
        ) : errorMessage ? (
          <Text className="text-center text-red-500">{errorMessage}</Text>
        ) : fichasTecnicas.length === 0 ? (
          <Text className="text-center text-gray-500">Nenhuma ficha técnica encontrada.</Text>
        ) : (
          <FichaTecnicaTable fichasTecnicas={fichasTecnicas} onUpdate={fetchData} />
        )}
      </Card>

      <AddFichaTecnica
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </main>
  )
} 