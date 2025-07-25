'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text, Badge } from '@tremor/react';
import { CalculatorIcon, BeakerIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface Menu {
  id: number;
  name: string;
  description: string | null;
  type: string;
}

interface Recipe {
  id: number;
  name: string;
  description: string | null;
  cost_per_yield: string;
  total_cost: string;
  yield_quantity: string;
  yield_unit: string;
  ingredients: {
    ingredient: {
      name: string;
      cost_per_unit: string;
    };
    quantity: string;
    unit: string;
  }[];
}

interface Category {
  id: number;
  name: string;
}

interface AddCardapioImprovedProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCardapioImproved({ isOpen, onClose, onSuccess }: AddCardapioImprovedProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [menuId, setMenuId] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [desiredMargin, setDesiredMargin] = useState('60');
  const [manualPricing, setManualPricing] = useState(false);
  const [manualPrice, setManualPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dados carregados
  const [menus, setMenus] = useState<Menu[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Carregar dados necessários
  useEffect(() => {
    if (isOpen) {
      fetchMenus();
      fetchRecipes();
      fetchCategories();
    }
  }, [isOpen]);

  // Buscar menus
  const fetchMenus = async () => {
    try {
      const response = await fetch('/api/menus');
      if (response.ok) {
        const data = await response.json();
        setMenus(data);
      }
    } catch (error) {
      console.error('Erro ao buscar menus:', error);
    }
  };

  // Buscar receitas
  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/ficha-tecnica');
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      }
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  };

  // Buscar categorias
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  // Atualizar receita selecionada
  useEffect(() => {
    if (recipeId) {
      const recipe = recipes.find(r => r.id.toString() === recipeId);
      setSelectedRecipe(recipe || null);
    } else {
      setSelectedRecipe(null);
    }
  }, [recipeId, recipes]);

  // Calcular preço sugerido
  const calculateSuggestedPrice = () => {
    if (!selectedRecipe) return 0;
    
    const costPerYield = parseFloat(selectedRecipe.cost_per_yield);
    const margin = parseFloat(desiredMargin);
    
    return costPerYield / (1 - margin / 100);
  };

  const suggestedPrice = calculateSuggestedPrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Nome do item é obrigatório');
      return;
    }

    if (!menuId) {
      setError('Selecione um cardápio');
      return;
    }

    if (!recipeId && !manualPricing) {
      setError('Selecione uma receita ou habilite preço manual');
      return;
    }

    if (manualPricing && !manualPrice) {
      setError('Preço manual é obrigatório');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/cardapios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          menu_id: parseInt(menuId),
          recipe_id: recipeId ? parseInt(recipeId) : null,
          category_id: categoryId ? parseInt(categoryId) : null,
          desired_margin: parseFloat(desiredMargin),
          manual_pricing: manualPricing,
          price: manualPricing ? parseFloat(manualPrice) : null,
          active: true
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao adicionar item');
      }

      // Limpar formulário
      setName('');
      setDescription('');
      setMenuId('');
      setRecipeId('');
      setCategoryId('');
      setDesiredMargin('60');
      setManualPricing(false);
      setManualPrice('');
      setSelectedRecipe(null);

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Erro ao adicionar item:', err);
      setError(err.message || 'Erro ao adicionar item. Tente novamente.');
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <Title>Adicionar Item ao Cardápio</Title>
              <Text className="mt-2">Crie um novo item com precificação automática baseada em receitas</Text>
            </div>
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              ✕
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
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
                  Cardápio *
                </label>
                <select
                  value={menuId}
                  onChange={(e) => setMenuId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione um cardápio</option>
                  {menus.map((menu) => (
                    <option key={menu.id} value={menu.id}>
                      {menu.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Receita (Ficha Técnica)
                </label>
                <select
                  value={recipeId}
                  onChange={(e) => setRecipeId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione uma receita (opcional)</option>
                  {recipes.map((recipe) => (
                    <option key={recipe.id} value={recipe.id}>
                      {recipe.name} - {formatCurrency(parseFloat(recipe.cost_per_yield))} por {recipe.yield_quantity} {recipe.yield_unit}
                    </option>
                  ))}
                </select>
              </div>
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

            {/* Precificação */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <CalculatorIcon className="w-5 h-5 text-blue-600" />
                <Title className="text-lg">Precificação</Title>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Margem Desejada (%)
                  </label>
                  <TextInput
                    placeholder="60"
                    value={desiredMargin}
                    onChange={(e) => setDesiredMargin(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="manualPricing"
                    checked={manualPricing}
                    onChange={(e) => setManualPricing(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="manualPricing" className="text-sm font-medium text-gray-700">
                    Definir preço manualmente
                  </label>
                </div>
              </div>

              {manualPricing && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preço Manual (R$)
                  </label>
                  <TextInput
                    placeholder="0.00"
                    value={manualPrice}
                    onChange={(e) => setManualPrice(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Informações da Receita Selecionada */}
            {selectedRecipe && (
              <div className="border-t pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <BeakerIcon className="w-5 h-5 text-green-600" />
                  <Title className="text-lg">Informações da Receita</Title>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Text className="text-sm font-medium text-gray-600">Custo por Porção</Text>
                      <Text className="text-lg font-bold text-red-600">
                        {formatCurrency(parseFloat(selectedRecipe.cost_per_yield))}
                      </Text>
                    </div>
                    <div>
                      <Text className="text-sm font-medium text-gray-600">Preço Sugerido</Text>
                      <Text className="text-lg font-bold text-green-600">
                        {formatCurrency(suggestedPrice)}
                      </Text>
                    </div>
                    <div>
                      <Text className="text-sm font-medium text-gray-600">Lucro Bruto</Text>
                      <Text className="text-lg font-bold text-blue-600">
                        {formatCurrency(suggestedPrice - parseFloat(selectedRecipe.cost_per_yield))}
                      </Text>
                    </div>
                  </div>

                  <div>
                    <Text className="text-sm font-medium text-gray-600 mb-2">Ingredientes:</Text>
                    <div className="space-y-1">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{ingredient.ingredient.name}</span>
                          <span className="text-gray-600">
                            {ingredient.quantity} {ingredient.unit} - {formatCurrency(parseFloat(ingredient.ingredient.cost_per_unit) * parseFloat(ingredient.quantity))}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <Text className="text-red-600">{error}</Text>
              </div>
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
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Adicionar Item
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 