'use client'

import { useEffect, useState } from 'react'
import { Card, Title, Text, Button, TextInput } from '@tremor/react'
import supabase from '../../../../lib/supabase'

interface Setting {
  id: number
  key: string
  value: string
  type: string
  description?: string
  updated_at?: string
}

const typeOptions = [
  { value: 'string', label: 'Texto' },
  { value: 'number', label: 'Número' },
  { value: 'boolean', label: 'Booleano' },
  { value: 'json', label: 'JSON' },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<any>('')
  const [editType, setEditType] = useState<string>('string')
  const [editDescription, setEditDescription] = useState<string>('')
  const [search, setSearch] = useState('')
  const [adding, setAdding] = useState(false)
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')
  const [newType, setNewType] = useState('string')
  const [newDescription, setNewDescription] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    setLoading(true)
    const { data, error } = await supabase.from('settings').select('*').order('key')
    if (!error) setSettings(data)
    setLoading(false)
  }

  function handleEdit(setting: Setting) {
    setEditing(setting.key)
    setEditValue(setting.value)
    setEditType(setting.type)
    setEditDescription(setting.description || '')
  }

  async function handleSave(key: string) {
    let val = editValue
    if (editType === 'boolean') val = String(val) === 'true' ? 'true' : 'false'
    if (editType === 'json') {
      try {
        JSON.parse(val)
      } catch {
        setError('JSON inválido')
        return
      }
    }
    const { error } = await supabase
      .from('settings')
      .update({ value: val, type: editType, description: editDescription })
      .eq('key', key)
    if (!error) {
      setFeedback('Configuração salva!')
      setEditing(null)
      fetchSettings()
    } else {
      setError('Erro ao salvar configuração')
    }
  }

  async function handleDelete(key: string) {
    if (!confirm('Tem certeza que deseja excluir esta configuração?')) return
    const { error } = await supabase.from('settings').delete().eq('key', key)
    if (!error) {
      setFeedback('Configuração excluída!')
      fetchSettings()
    } else {
      setError('Erro ao excluir configuração')
    }
  }

  async function handleAdd() {
    if (!newKey.trim()) {
      setError('A chave é obrigatória')
      return
    }
    let val = newValue
    if (newType === 'boolean') val = String(val) === 'true' ? 'true' : 'false'
    if (newType === 'json') {
      try {
        JSON.parse(val)
      } catch {
        setError('JSON inválido')
        return
      }
    }
    const { error } = await supabase
      .from('settings')
      .insert([{ key: newKey, value: val, type: newType, description: newDescription }])
    if (!error) {
      setFeedback('Configuração adicionada!')
      setAdding(false)
      setNewKey('')
      setNewValue('')
      setNewType('string')
      setNewDescription('')
      fetchSettings()
    } else {
      setError('Erro ao adicionar configuração')
    }
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-4xl">
      <Title>Configurações do Sistema</Title>
      <Text className="mb-6">Gerencie todas as configurações globais do sistema.</Text>
      {feedback && <Text className="text-green-600 mb-2">{feedback}</Text>}
      {error && <Text className="text-red-600 mb-2">{error}</Text>}
      <TextInput
        placeholder="Buscar configuração..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4"
      />
      <Card>
        <div className="flex justify-end mb-2">
          <Button onClick={() => setAdding(!adding)}>{adding ? 'Cancelar' : '+ Nova Configuração'}</Button>
        </div>
        {adding && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg flex flex-col md:flex-row gap-2 items-center">
            <TextInput
              placeholder="Chave"
              value={newKey}
              onChange={e => setNewKey(e.target.value)}
              className="w-full md:w-1/5"
            />
            <select
              value={newType}
              onChange={e => setNewType(e.target.value)}
              className="w-full md:w-1/5 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <TextInput
              placeholder="Valor"
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
              className="w-full md:w-1/5"
            />
            <TextInput
              placeholder="Descrição"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              className="w-full md:w-1/4"
            />
            <Button onClick={handleAdd}>Salvar</Button>
          </div>
        )}
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Chave</th>
                  <th className="text-left">Valor</th>
                  <th className="text-left">Tipo</th>
                  <th className="text-left">Descrição</th>
                  <th className="text-left">Atualizado</th>
                  <th className="text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {settings
                  .filter(s => s.key.includes(search) || (s.description || '').includes(search))
                  .map(setting => (
                  <tr key={setting.key} className={editing === setting.key ? 'bg-blue-50' : ''}>
                    <td>{setting.key}</td>
                    <td>
                      {editing === setting.key ? (
                        setting.type === 'boolean' ? (
                          <select
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            className="px-2 py-1 border rounded"
                          >
                            <option value="true">Ativado</option>
                            <option value="false">Desativado</option>
                          </select>
                        ) : (
                          <TextInput
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                          />
                        )
                      ) : (
                        <span>{setting.value}</span>
                      )}
                    </td>
                    <td>
                      {editing === setting.key ? (
                        <select
                          value={editType}
                          onChange={e => setEditType(e.target.value)}
                          className="px-2 py-1 border rounded"
                        >
                          {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                      ) : (
                        setting.type
                      )}
                    </td>
                    <td>
                      {editing === setting.key ? (
                        <TextInput
                          value={editDescription}
                          onChange={e => setEditDescription(e.target.value)}
                        />
                      ) : (
                        setting.description
                      )}
                    </td>
                    <td>{setting.updated_at ? new Date(setting.updated_at).toLocaleString('pt-BR') : '-'}</td>
                    <td>
                      {editing === setting.key ? (
                        <>
                          <Button size="xs" onClick={() => handleSave(setting.key)}>Salvar</Button>
                          <Button size="xs" variant="secondary" onClick={() => setEditing(null)}>Cancelar</Button>
                        </>
                      ) : (
                        <>
                          <Button size="xs" onClick={() => handleEdit(setting)}>Editar</Button>
                          <Button size="xs" variant="secondary" color="red" onClick={() => handleDelete(setting.key)}>Excluir</Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </main>
  )
}
