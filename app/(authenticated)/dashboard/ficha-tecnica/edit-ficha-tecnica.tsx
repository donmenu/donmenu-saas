'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text } from '@tremor/react';
import supabase from '../../../../lib/supabase';

interface Item {
  item_id: number;
  name: string;
  description: string;
  price: number;
  categories: {
    category_id: number;
    name: string;
  };
}

interface Ingredient {
  ingredient_id: number;
  name: string;
  unit: string;
  cost_per_unit: number;
}

interface ItemIngredient {
  item_ingredient_id: number;
  ingredient_id: number;
  quantity: number;
  ingredients: Ingredient;
}

interface EditFichaTecnicaProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  item: Item | null;
}

export default function EditFichaTecnica({ isOpen, onClose, onSuccess, item }: EditFichaTecnicaProps) {
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
  const [currentIngredients, setCurrentIngredients] = useState<ItemIngredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchAvailableIngredients();
      if (item) {
        fetchCurrentIngredients();
      }
    }
  }, [isOpen, item]);

  useEffect(() => {
    fetchCurrentIngredients();
  }, [fetchCurrentIngredients]);

  const fetchAvailableIngredients = async () => {
    try {
      const { data, error } = await supabase
        .from('ingredients')
        .select('ingredient_id, name, unit, cost_per_unit')
        .order('name');

      if (error) throw error;
      setAvailableIngredients(data || []);
    } catch (err: any) {
      console.error('Erro ao buscar ingredientes:', err);
    }
  };

  const fetchCurrentIngredients = async () => {
    if (!item) return;

    try {
      const { data, error } = await supabase
        .from('item_ingredients')
        .select(`
          item_ingredient_id,
          ingredient_id,
          quantity,
          ingredients (
            ingredient_id,
            name,
            unit,
            cost_per_unit
          )
        `)
        .eq('item_id', item.item_id);

      if (error) throw error;
      setCurrentIngredients((data as any) || []);
    } catch (err: any) {
      console.error('Erro ao buscar ingredientes do item:', err);
    }
  };

  const handleAddIngredient = () => {
    if (!selectedIngredient || !quantity || !item) return;

    const ingredient = availableIngredients.find(i => i.ingredient_id.toString() === selectedIngredient);
    if (!ingredient) return;

    const newItemIngredient: ItemIngredient = {
      item_ingredient_id: Date.now(), // ID temporário
      ingredient_id: ingredient.ingredient_id,
      quantity: parseFloat(quantity),
      ingredients: ingredient
    };

    setCurrentIngredients([...currentIngredients, newItemIngredient]);
    setSelectedIngredient('');
    setQuantity('');
  };

  const handleRemoveIngredient = (itemIngredientId: number) => {
    setCurrentIngredients(currentIngredients.filter(i => i.item_ingredient_id !== itemIngredientId));
  };

  const handleSave = async () => {
    if (!item) return;

    setLoading(true);
    setError('');

    try {
      // Primeiro, remover todos os ingredientes existentes
      const { error: deleteError } = await supabase
        .from('item_ingredients')
        .delete()
        .eq('item_id', item.item_id);

      if (deleteError) throw deleteError;

      // Depois, inserir os novos ingredientes
      if (currentIngredients.length > 0) {
        const ingredientsToInsert = currentIngredients.map(ci => ({
          item_id: item.item_id,
          ingredient_id: ci.ingredient_id,
          quantity: ci.quantity
        }));

        const { error: insertError } = await supabase
          .from('item_ingredients')
          .insert(ingredientsToInsert);

        if (insertError) throw insertError;
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Erro ao salvar ficha técnica:', err);
      setError('Erro ao salvar ficha técnica. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Title>Editar Ficha Técnica - {item.name}</Title>
              <Text className="mt-2">Gerencie os ingredientes e quantidades</Text>
            </div>
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
          </div>

          {/* Adicionar Ingrediente */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <Title className="mb-4">Adicionar Ingrediente</Title>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingrediente
                </label>
                <select
                  value={selectedIngredient}
                  onChange={(e) => setSelectedIngredient(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione um ingrediente</option>
                  {availableIngredients.map((ingredient) => (
                    <option key={ingredient.ingredient_id} value={ingredient.ingredient_id}>
                      {ingredient.name} ({ingredient.unit})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade
                </label>
                <TextInput
                  placeholder="0.00"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleAddIngredient}
                  disabled={!selectedIngredient || !quantity}
                  className="w-full"
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </div>

          {/* Lista de Ingredientes */}
          <div className="mb-6">
            <Title className="mb-4">Ingredientes da Ficha Técnica</Title>
            {currentIngredients.length === 0 ? (
              <Text className="text-center text-gray-500">Nenhum ingrediente adicionado.</Text>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Ingrediente</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Quantidade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Unidade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Custo Unitário</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentIngredients.map((itemIngredient) => (
                      <tr key={itemIngredient.item_ingredient_id}>
                        <td className="border border-gray-300 px-4 py-2">
                          {itemIngredient.ingredients.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {itemIngredient.quantity}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {itemIngredient.ingredients.unit}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {formatCurrency(itemIngredient.ingredients.cost_per_unit)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Button
                            size="xs"
                            variant="secondary"
                            color="red"
                            onClick={() => handleRemoveIngredient(itemIngredient.item_ingredient_id)}
                          >
                            Remover
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {error && (
            <Text className="text-red-500 text-sm mb-4">{error}</Text>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              loading={loading}
              disabled={loading}
            >
              Salvar Ficha Técnica
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 