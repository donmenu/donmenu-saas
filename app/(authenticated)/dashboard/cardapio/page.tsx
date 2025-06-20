'use client'

import { Card, Title, Text } from '@tremor/react'
import supabase from '../../../../lib/supabase'
import { useEffect, useState } from 'react'
import Search from '../../../search'
import CardapiosTable from './table-cardapio'

export default function IndexPage({ searchParams }: { searchParams: { q: string } }) {
  const [cardapios, setCardapios] = useState<any[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const search = searchParams.q ?? ''

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setErrorMessage('')

      const { data, error } = await supabase
        .from('cardapios')
        .select('id, item, status')
        .ilike('item', `%${search}%`) // case-insensitive LIKE

      if (error) {
        console.error('Erro ao buscar dados:', error)
        setErrorMessage('Não foi possível conectar ao banco de dados.')
      } else {
        setCardapios(data || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [search])

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Cardápios</Title>
      <Text>Lista de cardápios</Text>
      <Search />
      <Card className="mt-6">
        {loading ? (
          <Text className="text-center text-gray-400">Carregando...</Text>
        ) : errorMessage ? (
          <Text className="text-center text-red-500">{errorMessage}</Text>
        ) : cardapios.length === 0 ? (
          <Text className="text-center text-gray-500">Nenhum cardápio encontrado.</Text>
        ) : (
          <CardapiosTable cardapios={cardapios} />
        )}
      </Card>
    </main>
  )
}
