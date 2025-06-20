'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text } from '@tremor/react';
import supabase from '../../../../lib/supabase';
import type { Cardapio } from '../../../../types/cardapio';

interface EditCardapioProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cardapio: Cardapio | null;
}

export default function EditCardapio({ isOpen, onClose, onSuccess, cardapio }: EditCardapioProps) {
  const [item, setItem] = useState('');
  const [status, setStatus] = useState('ativo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (cardapio) {
      setItem(cardapio.item || '');
      setStatus(cardapio.status || 'ativo');
    }
  }, [cardapio]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardapio) return;
    
    if (!item.trim()) {
      setError('O nome do item é obrigatório');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('cardapios')
        .update({
          item: item.trim(),
          status: status
        })
        .eq('id', cardapio.id);

      if (error) {
        throw error;
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Erro ao atualizar cardápio:', err);
      setError('Erro ao atualizar cardápio. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !cardapio) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <Title>Editar Cardápio</Title>
          <Text className="mt-2">Edite os dados do item do cardápio</Text>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Item *
              </label>
              <TextInput
                id="item"
                placeholder="Ex: X-Burger, Pizza Margherita..."
                value={item}
                onChange={(e) => setItem(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="em_breve">Em Breve</option>
              </select>
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