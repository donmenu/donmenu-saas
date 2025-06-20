'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text } from '@tremor/react';
import supabase from '../../../../lib/supabase';

interface Supply {
  ingredient_id: number;
  name: string;
  unit: string;
  cost_per_unit: number;
}

interface EditSupplyProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  supply: Supply | null;
}

export default function EditSupply({ isOpen, onClose, onSuccess, supply }: EditSupplyProps) {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [costPerUnit, setCostPerUnit] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (supply) {
      setName(supply.name || '');
      setUnit(supply.unit || '');
      setCostPerUnit(supply.cost_per_unit?.toString() || '');
    }
  }, [supply]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supply) return;
    
    if (!name.trim()) {
      setError('O nome do insumo é obrigatório');
      return;
    }

    if (!unit.trim()) {
      setError('A unidade é obrigatória');
      return;
    }

    if (!costPerUnit || parseFloat(costPerUnit) <= 0) {
      setError('O custo por unidade deve ser maior que zero');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('ingredients')
        .update({
          name: name.trim(),
          unit: unit.trim(),
          cost_per_unit: parseFloat(costPerUnit)
        })
        .eq('ingredient_id', supply.ingredient_id);

      if (error) {
        throw error;
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Erro ao atualizar insumo:', err);
      setError('Erro ao atualizar insumo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !supply) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <Title>Editar Insumo</Title>
          <Text className="mt-2">Edite os dados do insumo</Text>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Insumo *
              </label>
              <TextInput
                id="name"
                placeholder="Ex: Farinha, Tomate, Queijo..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                Unidade *
              </label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecione uma unidade</option>
                <option value="kg">Quilograma (kg)</option>
                <option value="g">Grama (g)</option>
                <option value="l">Litro (L)</option>
                <option value="ml">Mililitro (ml)</option>
                <option value="un">Unidade (un)</option>
                <option value="pct">Pacote (pct)</option>
                <option value="cx">Caixa (cx)</option>
                <option value="lata">Lata</option>
                <option value="garrafa">Garrafa</option>
              </select>
            </div>

            <div>
              <label htmlFor="costPerUnit" className="block text-sm font-medium text-gray-700 mb-1">
                Custo por Unidade (R$) *
              </label>
              <TextInput
                id="costPerUnit"
                placeholder="0.00"
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(e.target.value)}
                required
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