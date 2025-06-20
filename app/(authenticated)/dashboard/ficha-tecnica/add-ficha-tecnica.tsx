'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text } from '@tremor/react';
import supabase from '../../../../lib/supabase';

interface Category {
  category_id: number;
  name: string;
}

interface Ingredient {
  ingredient_id: number;
  name: string;
  unit: string;
  cost_per_unit: number;
}

interface AddFichaTecnicaProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddFichaTecnica({ isOpen, onClose, onSuccess }: AddFichaTecnicaProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ingredients, setIngredients] = useState<Array<{ingredient_id: number, quantity: number, ingredient: Ingredient}>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchIngredients();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('category_id, name')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (err: any) {
      console.error('Erro ao buscar categorias:', err);
    }
  };

  const fetchIngredients = async () => {
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

  const handleAddIngredient = () => {
    if (!selectedIngredient || !quantity) return;

    const ingredient = availableIngredients.find(i => i.ingredient_id.toString() === selectedIngredient);
    if (!ingredient) return;

    const newIngredient = {
      ingredient_id: ingredient.ingredient_id,
      quantity: parseFloat(quantity),
      ingredient: ingredient
    };

    setIngredients([...ingredients, newIngredient]);
    setSelectedIngredient('');
    setQuantity('');
  };

  const handleRemoveIngredient = (ingredientId: number) => {
    setIngredients(ingredients.filter(i => i.ingredient_id !== ingredientId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('O nome do item é obrigatório');
      return;
    }

    if (!price || parseFloat(price) <= 0) {
      setError('O preço deve ser maior que zero');
      return;
    }

    if (!categoryId) {
      setError('A categoria é obrigatória');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Primeiro, criar o item
      const { data: itemData, error: itemError } = await supabase
        .from('itens')
        .insert([
          {
            name: name.trim(),
            description: description.trim() || null,
            price: parseFloat(price),
            category_id: parseInt(categoryId)
          }
        ])
        .select()
        .single();

      if (itemError) throw itemError;

      // Depois, adicionar os ingredientes se houver
      if (ingredients.length > 0 && itemData) {
        const ingredientsToInsert = ingredients.map(ing => ({
          item_id: itemData.item_id,
          ingredient_id: ing.ingredient_id,
          quantity: ing.quantity
        }));

        const { error: ingredientsError } = await supabase
          .from('item_ingredients')
          .insert(ingredientsToInsert);

        if (ingredientsError) throw ingredientsError;
      }

      // Limpar formulário
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId('');
      setIngredients([]);
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Erro ao criar ficha técnica:', err);
      setError('Erro ao criar ficha técnica. Tente novamente.');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Title>Nova Ficha Técnica</Title>
              <Text className="mt-2">Crie um novo item com sua ficha técnica</Text>
            </div>
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações do Item */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Item *
                </label>
                <TextInput
                  placeholder="Ex: X-Burger, Pizza Margherita..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço (R$) *
                </label>
                <TextInput
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  placeholder="Descrição do item..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Adicionar Ingrediente */}
            <div className="p-4 bg-gray-50 rounded-lg">
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
                    type="button"
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
            {ingredients.length > 0 && (
              <div>
                <Title className="mb-4">Ingredientes Adicionados</Title>
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
                      {ingredients.map((ingredient) => (
                        <tr key={ingredient.ingredient_id}>
                          <td className="border border-gray-300 px-4 py-2">
                            {ingredient.ingredient.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {ingredient.quantity}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {ingredient.ingredient.unit}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {formatCurrency(ingredient.ingredient.cost_per_unit)}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Button
                              size="xs"
                              variant="secondary"
                              color="red"
                              onClick={() => handleRemoveIngredient(ingredient.ingredient_id)}
                            >
                              Remover
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {error && (
              <Text className="text-red-500 text-sm">{error}</Text>
            )}

            <div className="flex justify-end space-x-3">
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
                Criar Ficha Técnica
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 