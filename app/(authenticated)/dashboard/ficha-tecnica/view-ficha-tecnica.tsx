'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button, Title, Text } from '@tremor/react';
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
  item_ingredient_id: number;
  ingredient_id: number;
  quantity: number;
  ingredients: {
    name: string;
    unit: string;
    cost_per_unit: number;
  } | null;
}

interface ViewFichaTecnicaProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
}

export default function ViewFichaTecnica({ isOpen, onClose, item }: ViewFichaTecnicaProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchIngredients = useCallback(async () => {
    if (!item) return;
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('item_ingredients')
        .select(`
          item_ingredient_id,
          ingredient_id,
          quantity,
          ingredients (
            name,
            unit,
            cost_per_unit
          )
        `)
        .eq('item_id', item.item_id);
      if (error) {
        throw error;
      }
      setIngredients((data as any) || []);
    } catch (err: any) {
      console.error('Erro ao buscar ingredientes:', err);
      setError('Erro ao carregar ingredientes.');
    } finally {
      setLoading(false);
    }
  }, [item]);

  useEffect(() => {
    if (isOpen && item) {
      fetchIngredients();
    }
  }, [isOpen, item, fetchIngredients]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateTotalCost = () => {
    return ingredients.reduce((total, ingredient) => {
      const cost = ingredient.ingredients?.cost_per_unit || 0;
      return total + (ingredient.quantity * cost);
    }, 0);
  };

  const calculateProfit = () => {
    const totalCost = calculateTotalCost();
    return item ? item.price - totalCost : 0;
  };

  const calculateProfitMargin = () => {
    if (!item || item.price === 0) return 0;
    const profit = calculateProfit();
    return (profit / item.price) * 100;
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Title>Ficha Técnica - {item.name}</Title>
              <Text className="mt-2">Detalhes da composição e custos</Text>
            </div>
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Fechar
            </Button>
          </div>

          {/* Informações do Item */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <Text className="text-sm font-medium text-gray-600">Categoria</Text>
              <Text className="text-lg">{item.categories?.name || 'Sem categoria'}</Text>
            </div>
            <div>
              <Text className="text-sm font-medium text-gray-600">Preço de Venda</Text>
              <Text className="text-lg font-semibold text-green-600">
                {formatCurrency(item.price)}
              </Text>
            </div>
            <div>
              <Text className="text-sm font-medium text-gray-600">Descrição</Text>
              <Text className="text-sm">{item.description || 'Sem descrição'}</Text>
            </div>
          </div>

          {/* Lista de Ingredientes */}
          <div className="mb-6">
            <Title className="mb-4">Ingredientes</Title>
            {loading ? (
              <Text className="text-center text-gray-400">Carregando ingredientes...</Text>
            ) : error ? (
              <Text className="text-center text-red-500">{error}</Text>
            ) : ingredients.length === 0 ? (
              <Text className="text-center text-gray-500">Nenhum ingrediente cadastrado.</Text>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Ingrediente</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Quantidade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Unidade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Custo Unitário</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Custo Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((ingredient) => (
                      <tr key={ingredient.item_ingredient_id}>
                        <td className="border border-gray-300 px-4 py-2">
                          {ingredient.ingredients?.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {ingredient.quantity}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {ingredient.ingredients?.unit}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {formatCurrency(ingredient.ingredients?.cost_per_unit || 0)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 font-semibold">
                          {formatCurrency(ingredient.quantity * (ingredient.ingredients?.cost_per_unit || 0))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Resumo Financeiro */}
          {ingredients.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
              <div>
                <Text className="text-sm font-medium text-gray-600">Custo Total</Text>
                <Text className="text-lg font-semibold text-red-600">
                  {formatCurrency(calculateTotalCost())}
                </Text>
              </div>
              <div>
                <Text className="text-sm font-medium text-gray-600">Preço de Venda</Text>
                <Text className="text-lg font-semibold text-green-600">
                  {formatCurrency(item.price)}
                </Text>
              </div>
              <div>
                <Text className="text-sm font-medium text-gray-600">Lucro</Text>
                <Text className={`text-lg font-semibold ${calculateProfit() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(calculateProfit())}
                </Text>
              </div>
              <div>
                <Text className="text-sm font-medium text-gray-600">Margem de Lucro</Text>
                <Text className={`text-lg font-semibold ${calculateProfitMargin() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {calculateProfitMargin().toFixed(1)}%
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 