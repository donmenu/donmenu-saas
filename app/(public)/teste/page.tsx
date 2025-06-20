'use client'

import { useEffect, useState } from 'react'
import supabase from '../../../lib/supabase'

export default function TesteSupabase() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('itens').select('*')
      if (error) console.error('Erro:', error)
      else setData(data)
    }

    fetchData()
  }, [])

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}
