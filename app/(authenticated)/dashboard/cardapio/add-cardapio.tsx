'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text } from '@tremor/react';
import supabase from '../../../../lib/supabase';
import type { Cardapio } from '../../../../types/cardapio';

interface AddCardapioProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  preSelectedMenuId?: number | null;
}

export default function AddCardapio({ isOpen, onClose, onSuccess, preSelectedMenuId }: AddCardapioProps) {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [menuId, setMenuId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (preSelectedMenuId) {
      setMenuId(preSelectedMenuId.toString());
    }
  }, [preSelectedMenuId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item.trim() || !price || !menuId || !restaurantId) {
      setError('Nome, preço, menu_id e restaurant_id são obrigatórios');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/cardapios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: item.trim(),
          price: parseFloat(price),
          menu_id: parseInt(menuId, 10),
          restaurant_id: parseInt(restaurantId, 10),
          active
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao adicionar cardápio. Tente novamente.');
      }
      setItem('');
      setPrice('');
      setMenuId('');
      setRestaurantId('');
      setActive(true);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Erro ao adicionar cardápio:', err);
      setError(err.message || 'Erro ao adicionar cardápio. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <Title>Adicionar Novo Cardápio</Title>
          <Text className="mt-2">Preencha os dados do novo item do cardápio</Text>
          
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
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Preço *
              </label>
              <TextInput
                id="price"
                placeholder="Ex: 19.90"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="menuId" className="block text-sm font-medium text-gray-700 mb-1">
                Menu ID *
              </label>
              <TextInput
                id="menuId"
                placeholder="ID do menu"
                value={menuId}
                onChange={(e) => setMenuId(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="restaurantId" className="block text-sm font-medium text-gray-700 mb-1">
                Restaurante ID *
              </label>
              <TextInput
                id="restaurantId"
                placeholder="ID do restaurante"
                value={restaurantId}
                onChange={(e) => setRestaurantId(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="active" className="block text-sm font-medium text-gray-700 mb-1">
                Ativo
              </label>
              <select
                id="active"
                value={active ? 'ativo' : 'inativo'}
                onChange={(e) => setActive(e.target.value === 'ativo')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
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
                Adicionar Cardápio
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 