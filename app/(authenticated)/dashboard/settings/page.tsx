'use client'

import { useEffect, useState } from 'react'
import { Card, Title, Text, Button, TextInput } from '@tremor/react'
import supabase from '../../../../lib/supabase'
import DashboardShell from '../DashboardShell';
import Image from 'next/image';

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
  // Dados do restaurante
  const [restaurant, setRestaurant] = useState<any>(null);
  const [restLoading, setRestLoading] = useState(true);
  const [restEdit, setRestEdit] = useState(false);
  const [restForm, setRestForm] = useState<any>({});
  const [restFeedback, setRestFeedback] = useState<string|null>(null);

  // Preferências
  const [theme, setTheme] = useState('auto');
  const [language, setLanguage] = useState('pt-BR');
  const [notifications, setNotifications] = useState(true);

  // Operação
  const [metaFaturamento, setMetaFaturamento] = useState('');
  const [horarioAbertura, setHorarioAbertura] = useState('08:00');
  const [horarioFechamento, setHorarioFechamento] = useState('18:00');
  const [tipoServico, setTipoServico] = useState('salão');

  // Integrações (placeholders)
  const [ifoodConnected, setIfoodConnected] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);

  // Avançado (settings)
  const [settings, setSettings] = useState<any[]>([]);
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    // Buscar dados do restaurante (mock: id=1)
    async function fetchRestaurant() {
      setRestLoading(true);
      const { data, error } = await supabase.from('restaurants').select('*').eq('id', 1).single();
      if (data) {
        setRestaurant(data);
        setRestForm(data);
      }
      setRestLoading(false);
    }
    fetchRestaurant();
    // Buscar meta de faturamento
    supabase.from('settings').select('*').eq('key', 'meta_faturamento').single().then(({ data }) => {
      if (data && data.value) setMetaFaturamento(data.value);
    });
    // Buscar settings avançados
    supabase.from('settings').select('*').then(({ data }) => {
      setSettings(data || []);
      setSettingsLoading(false);
    });
  }, []);

  async function handleSaveRestaurant() {
    setRestFeedback(null);
    const { error } = await supabase.from('restaurants').update(restForm).eq('id', restForm.id);
    if (!error) {
      setRestFeedback('Dados do restaurante salvos!');
      setRestEdit(false);
    } else {
      setRestFeedback('Erro ao salvar dados.');
    }
  }

  async function handleSaveMeta() {
    await supabase.from('settings').upsert({ key: 'meta_faturamento', value: metaFaturamento, type: 'number' });
  }

  return (
    <DashboardShell>
      <main className="p-4 md:p-10 mx-auto max-w-4xl space-y-8">
        <Title>Configurações do Restaurante</Title>
        <Text className="mb-6">Personalize como o sistema funciona para o seu negócio.</Text>

        {/* Dados do restaurante */}
        <Card className="mb-6">
          <Title className="mb-2">Dados do Restaurante</Title>
          {restLoading ? <Text>Carregando...</Text> : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Image src={restForm.logo_url || '/images/logo.svg'} alt="Logo" width={64} height={64} className="rounded-lg border" />
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={restForm.name || ''}
                    onChange={e => setRestForm({ ...restForm, name: e.target.value })}
                    disabled={!restEdit}
                  />
                  <label className="block text-sm font-medium mb-1">CNPJ</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={restForm.cnpj || ''}
                    onChange={e => setRestForm({ ...restForm, cnpj: e.target.value })}
                    disabled={!restEdit}
                  />
                </div>
              </div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={restForm.email || ''}
                onChange={e => setRestForm({ ...restForm, email: e.target.value })}
                disabled={!restEdit}
              />
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={restForm.phone || ''}
                onChange={e => setRestForm({ ...restForm, phone: e.target.value })}
                disabled={!restEdit}
              />
              <label className="block text-sm font-medium mb-1">Endereço</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={restForm.address || ''}
                onChange={e => setRestForm({ ...restForm, address: e.target.value })}
                disabled={!restEdit}
              />
              <div className="flex space-x-2">
                <label className="block text-sm font-medium mb-1">Cidade</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={restForm.city || ''}
                  onChange={e => setRestForm({ ...restForm, city: e.target.value })}
                  disabled={!restEdit}
                />
                <label className="block text-sm font-medium mb-1">Estado</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={restForm.state || ''}
                  onChange={e => setRestForm({ ...restForm, state: e.target.value })}
                  disabled={!restEdit}
                />
                <label className="block text-sm font-medium mb-1">CEP</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={restForm.zip_code || ''}
                  onChange={e => setRestForm({ ...restForm, zip_code: e.target.value })}
                  disabled={!restEdit}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setRestEdit(!restEdit)}>{restEdit ? 'Cancelar' : 'Editar'}</Button>
                {restEdit && <Button onClick={handleSaveRestaurant} color="green">Salvar</Button>}
                {restFeedback && <Text className="ml-4 text-green-600">{restFeedback}</Text>}
              </div>
            </div>
          )}
        </Card>

        {/* Preferências do sistema */}
        <Card className="mb-6">
          <Title className="mb-2">Preferências do Sistema</Title>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <label className="block text-sm font-medium mb-1">Tema</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={theme}
              onChange={e => setTheme(e.target.value)}
            >
              <option value="auto">Automático</option>
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
            </select>
            <label className="block text-sm font-medium mb-1">Idioma</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="pt-BR">Português</option>
              <option value="en-US">Inglês</option>
            </select>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={e => setNotifications(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span>Notificações</span>
              </label>
            </div>
          </div>
        </Card>

        {/* Parâmetros operacionais */}
        <Card className="mb-6">
          <Title className="mb-2">Operação</Title>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <label className="block text-sm font-medium mb-1">Meta de Faturamento (R$)</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={metaFaturamento}
              onChange={e => setMetaFaturamento(e.target.value)}
              onBlur={handleSaveMeta}
            />
            <label className="block text-sm font-medium mb-1">Horário de Abertura</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={horarioAbertura}
              onChange={e => setHorarioAbertura(e.target.value)}
              type="time"
            />
            <label className="block text-sm font-medium mb-1">Horário de Fechamento</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={horarioFechamento}
              onChange={e => setHorarioFechamento(e.target.value)}
              type="time"
            />
            <label className="block text-sm font-medium mb-1">Tipo de Serviço</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={tipoServico}
              onChange={e => setTipoServico(e.target.value)}
            >
              <option value="salão">Salão</option>
              <option value="balcão">Balcão</option>
              <option value="delivery">Delivery</option>
              <option value="todos">Todos</option>
            </select>
          </div>
        </Card>

        {/* Integrações */}
        <Card className="mb-6">
          <Title className="mb-2">Integrações</Title>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <Button color={ifoodConnected ? 'green' : 'gray'}>{ifoodConnected ? 'Ifood Conectado' : 'Conectar Ifood'}</Button>
            <Button color={whatsappConnected ? 'green' : 'gray'}>{whatsappConnected ? 'WhatsApp Conectado' : 'Conectar WhatsApp'}</Button>
          </div>
        </Card>

        {/* Avançado: settings extras */}
        <Card>
          <Title className="mb-2">Configurações Avançadas</Title>
          {settingsLoading ? <Text>Carregando...</Text> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left">Chave</th>
                    <th className="text-left">Valor</th>
                    <th className="text-left">Tipo</th>
                    <th className="text-left">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {settings.map(setting => (
                    <tr key={setting.key}>
                      <td>{setting.key}</td>
                      <td>{setting.value}</td>
                      <td>{setting.type}</td>
                      <td>{setting.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </DashboardShell>
  )
}
