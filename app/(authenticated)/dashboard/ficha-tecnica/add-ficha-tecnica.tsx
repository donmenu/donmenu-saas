'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text } from '@tremor/react';
import ManageCategories from './manage-categories';

interface Category {
  id: number;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
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
  const [yieldQuantity, setYieldQuantity] = useState('');
  const [yieldUnit, setYieldUnit] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ingredients, setIngredients] = useState<Array<{ingredient_id: number, quantity: number, ingredient: Ingredient}>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Produto, 2: Ingredientes, 3: Revisão
  const [showManageCategories, setShowManageCategories] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchIngredients();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Erro ao buscar categorias');
      }
      const data = await response.json();
      setCategories(data || []);
    } catch (err: any) {
      console.error('Erro ao buscar categorias:', err);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetch('/api/ingredients');
      if (!response.ok) {
        throw new Error('Erro ao buscar ingredientes');
      }
      const data = await response.json();
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

  // Adicionar nova categoria
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setAddingCategory(true);
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCategory.trim(),
          description: `Categoria ${newCategory.trim()}`,
          color: '#3B82F6',
          icon: '📁'
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar categoria');
      }

      const newCategoryData = await response.json();
      setCategories([...categories, newCategoryData]);
      setCategoryId(newCategoryData.id.toString());
      setNewCategory('');
    } catch (err) {
      console.error('Erro ao adicionar categoria:', err);
      alert('Erro ao adicionar categoria.');
    } finally {
      setAddingCategory(false);
    }
  };

  const handleSelectCategory = (category: Category) => {
    setCategoryId(category.id.toString());
    setShowManageCategories(false);
  };

  // Validação de cada etapa
  const validateStep1 = () => {
    if (!name.trim()) return 'O nome da ficha técnica é obrigatório';
    if (!yieldQuantity || parseFloat(yieldQuantity) <= 0) return 'A quantidade de rendimento deve ser maior que zero';
    if (!yieldUnit.trim()) return 'A unidade de rendimento é obrigatória';
    if (!categoryId) return 'A categoria é obrigatória';
    return '';
  };
  
  const validateStep2 = () => {
    if (ingredients.length === 0) return 'Adicione pelo menos um ingrediente';
    return '';
  };

  // Calcular custo total
  const calculateTotalCost = () => {
    return ingredients.reduce((acc, ing) => acc + (ing.ingredient.cost_per_unit * ing.quantity), 0);
  };

  // Novo handleSubmit para wizard
  const handleWizardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      const err = validateStep1();
      if (err) { setError(err); return; }
      setError('');
      setStep(2);
      return;
    }
    if (step === 2) {
      const err = validateStep2();
      if (err) { setError(err); return; }
      setError('');
      setStep(3);
      return;
    }
    if (step === 3) {
      // Submeter ficha técnica
      setLoading(true);
      setError('');
      try {
        const totalCost = calculateTotalCost();
        const costPerYield = totalCost / parseFloat(yieldQuantity);

        const response = await fetch('/api/ficha-tecnica', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            description: description.trim() || null,
            category_id: parseInt(categoryId),
            yield_quantity: parseFloat(yieldQuantity),
            yield_unit: yieldUnit.trim(),
            preparation_time: preparationTime ? parseInt(preparationTime) : null,
            difficulty: difficulty.trim() || null,
            instructions: instructions.trim() || null,
            total_cost: totalCost,
            cost_per_yield: costPerYield,
            ingredients: ingredients.map(ing => ({
              ingredient_id: ing.ingredient_id,
              quantity: ing.quantity,
              unit: ing.ingredient.unit
            }))
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao criar ficha técnica');
        }

        // Limpar formulário
        setName('');
        setDescription('');
        setYieldQuantity('');
        setYieldUnit('');
        setPreparationTime('');
        setDifficulty('');
        setInstructions('');
        setCategoryId('');
        setIngredients([]);
        setStep(1);
        onSuccess();
        onClose();
      } catch (err: any) {
        console.error('Erro ao criar ficha técnica:', err);
        setError(err.message || 'Erro ao criar ficha técnica. Tente novamente.');
      } finally { 
        setLoading(false); 
      }
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
              <Text className="mt-2">Crie uma nova ficha técnica com ingredientes e custos</Text>
            </div>
            <Button variant="secondary" onClick={onClose} disabled={loading}>Cancelar</Button>
          </div>

          {/* Wizard Steps */}
          <div className="flex items-center mb-8 gap-4">
            <div className={`flex-1 h-1 rounded ${step>=1?'bg-blue-500':'bg-gray-200'}`}></div>
            <div className={`flex-1 h-1 rounded ${step>=2?'bg-blue-500':'bg-gray-200'}`}></div>
            <div className={`flex-1 h-1 rounded ${step>=3?'bg-blue-500':'bg-gray-200'}`}></div>
          </div>

          <form onSubmit={handleWizardSubmit} className="space-y-6">
            {/* Etapa 1: Dados do Produto */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Ficha Técnica *</label>
                  <TextInput placeholder="Ex: Pizza Margherita, X-Burger..." value={name} onChange={e=>setName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                  <div className="flex gap-2">
                    <select 
                      value={categoryId} 
                      onChange={e=>setCategoryId(e.target.value)} 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    <Button 
                      type="button" 
                      size="xs" 
                      variant="secondary"
                      onClick={() => setShowManageCategories(true)}
                    >
                      Gerenciar
                    </Button>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Nova categoria"
                      value={newCategory}
                      onChange={e=>setNewCategory(e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded-md w-32"
                    />
                    <Button 
                      type="button" 
                      size="xs" 
                      loading={addingCategory} 
                      onClick={handleAddCategory} 
                      disabled={!newCategory.trim() || addingCategory}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade de Rendimento *</label>
                  <TextInput placeholder="1" value={yieldQuantity} onChange={e=>setYieldQuantity(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidade de Rendimento *</label>
                  <select 
                    value={yieldUnit} 
                    onChange={e=>setYieldUnit(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    required
                  >
                    <option value="">Selecione uma unidade</option>
                    <option value="un">Unidade (un)</option>
                    <option value="kg">Quilograma (kg)</option>
                    <option value="g">Grama (g)</option>
                    <option value="l">Litro (L)</option>
                    <option value="ml">Mililitro (ml)</option>
                    <option value="pct">Porção (pct)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tempo de Preparo (minutos)</label>
                  <TextInput placeholder="30" value={preparationTime} onChange={e=>setPreparationTime(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dificuldade</label>
                  <select 
                    value={difficulty} 
                    onChange={e=>setDifficulty(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Selecione a dificuldade</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Médio">Médio</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea 
                    placeholder="Descrição da ficha técnica..." 
                    value={description} 
                    onChange={e=>setDescription(e.target.value)} 
                    rows={3} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instruções de Preparo</label>
                  <textarea 
                    placeholder="Passo a passo do preparo..." 
                    value={instructions} 
                    onChange={e=>setInstructions(e.target.value)} 
                    rows={4} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
              </div>
            )}

            {/* Etapa 2: Ingredientes */}
            {step === 2 && (
              <div>
                <Title className="mb-4">Monte a ficha técnica do produto</Title>
                <Text className="mb-2">Adicione ingredientes e quantidades. Exemplo: para pizza, adicione massa, molho, queijo, etc.</Text>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ingrediente</label>
                    <select 
                      value={selectedIngredient} 
                      onChange={e=>setSelectedIngredient(e.target.value)} 
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                    <TextInput placeholder="0.00" value={quantity} onChange={e=>setQuantity(e.target.value)} />
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={handleAddIngredient} disabled={!selectedIngredient || !quantity} className="w-full">
                      Adicionar
                    </Button>
                  </div>
                </div>
                {/* Ingredientes adicionados */}
                {ingredients.length > 0 && (
                  <div>
                    <Title className="mb-2">Ingredientes adicionados</Title>
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
                              <td className="border border-gray-300 px-4 py-2">{ingredient.ingredient.name}</td>
                              <td className="border border-gray-300 px-4 py-2">{ingredient.quantity}</td>
                              <td className="border border-gray-300 px-4 py-2">{ingredient.ingredient.unit}</td>
                              <td className="border border-gray-300 px-4 py-2">{formatCurrency(ingredient.ingredient.cost_per_unit)}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                <Button size="xs" variant="secondary" color="red" onClick={()=>handleRemoveIngredient(ingredient.ingredient_id)}>
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
              </div>
            )}

            {/* Etapa 3: Revisão Final */}
            {step === 3 && (
              <div>
                <Title className="mb-4">Revisão da Ficha Técnica</Title>
                <div className="mb-4">
                  <Text className="font-bold">Nome:</Text> {name}<br/>
                  <Text className="font-bold">Categoria:</Text> {categories.find(c=>c.id.toString()===categoryId)?.name}<br/>
                  <Text className="font-bold">Rendimento:</Text> {yieldQuantity} {yieldUnit}<br/>
                  <Text className="font-bold">Descrição:</Text> {description || '-'}
                </div>
                <Title className="mb-2">Ingredientes</Title>
                <div className="overflow-x-auto mb-4">
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
                        <tr key={ingredient.ingredient_id}>
                          <td className="border border-gray-300 px-4 py-2">{ingredient.ingredient.name}</td>
                          <td className="border border-gray-300 px-4 py-2">{ingredient.quantity}</td>
                          <td className="border border-gray-300 px-4 py-2">{ingredient.ingredient.unit}</td>
                          <td className="border border-gray-300 px-4 py-2">{formatCurrency(ingredient.ingredient.cost_per_unit)}</td>
                          <td className="border border-gray-300 px-4 py-2">{formatCurrency(ingredient.ingredient.cost_per_unit * ingredient.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mb-2 text-right font-bold">
                  Custo total: {formatCurrency(calculateTotalCost())}<br/>
                  Custo por {yieldUnit}: {formatCurrency(calculateTotalCost() / parseFloat(yieldQuantity))}
                </div>
              </div>
            )}

            {error && (<Text className="text-red-500 text-sm">{error}</Text>)}

            {/* Navegação do Wizard */}
            <div className="flex justify-between space-x-3">
              {step > 1 ? (
                <Button type="button" variant="secondary" onClick={()=>setStep(step-1)} disabled={loading}>
                  Voltar
                </Button>
              ) : <span />}
              {step < 3 ? (
                <Button type="submit" disabled={loading}>
                  {step===1?'Avançar':'Próximo'}
                </Button>
              ) : (
                <Button type="submit" loading={loading} disabled={loading}>
                  Criar Ficha Técnica
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Gerenciamento de Categorias */}
      <ManageCategories
        isOpen={showManageCategories}
        onClose={() => setShowManageCategories(false)}
        onCategorySelect={handleSelectCategory}
      />
    </div>
  );
} 