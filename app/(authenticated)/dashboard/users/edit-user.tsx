'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text } from '@tremor/react';
import supabase from '../../../../lib/supabase';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  obs: string;
}

interface EditUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
}

export default function EditUser({ isOpen, onClose, onSuccess, user }: EditUserProps) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [obs, setObs] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
      setObs(user.obs || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (!name.trim()) {
      setError('O nome é obrigatório');
      return;
    }

    if (!username.trim()) {
      setError('O nome de usuário é obrigatório');
      return;
    }

    if (!email.trim()) {
      setError('O email é obrigatório');
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Digite um email válido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: name.trim(),
          username: username.trim(),
          email: email.trim().toLowerCase(),
          obs: obs.trim() || null
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Erro ao atualizar usuário:', err);
      setError('Erro ao atualizar usuário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <Title>Editar Usuário</Title>
          <Text className="mt-2">Edite os dados do usuário</Text>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <TextInput
                id="name"
                placeholder="Ex: João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Nome de Usuário *
              </label>
              <TextInput
                id="username"
                placeholder="Ex: joao.silva"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <TextInput
                id="email"
                placeholder="Ex: joao@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="obs" className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                id="obs"
                placeholder="Observações adicionais..."
                value={obs}
                onChange={(e) => setObs(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {error && (
              <Text className="text-red-500 text-sm">{error}</Text>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={loading}
              >
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 