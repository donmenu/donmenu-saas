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
  const [newCategory, setNewCategory] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ingredients, setIngredients] = useState<Array<{ingredient_id: number, quantity: number, ingredient: Ingredient}>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Produto, 2: Ingredientes, 3: Revisão

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

  // Adicionar nova categoria
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setAddingCategory(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name: newCategory.trim() }])
        .select();
      if (error) throw error;
      setCategories([...categories, ...(data || [])]);
      setNewCategory('');
    } catch (err) {
      alert('Erro ao adicionar categoria.');
    } finally {
      setAddingCategory(false);
    }
  };

  // Validação de cada etapa
  const validateStep1 = () => {
    if (!name.trim()) return 'O nome do item é obrigatório';
    if (!price || parseFloat(price) <= 0) return 'O preço deve ser maior que zero';
    if (!categoryId) return 'A categoria é obrigatória';
    return '';
  };
  const validateStep2 = () => {
    if (ingredients.length === 0) return 'Adicione pelo menos um ingrediente';
    return '';
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
        setName(''); setDescription(''); setPrice(''); setCategoryId(''); setIngredients([]);
        onSuccess(); onClose();
      } catch (err: any) {
        setError('Erro ao criar ficha técnica. Tente novamente.');
      } finally { setLoading(false); }
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto *</label>
                  <TextInput placeholder="Ex: Pizza Margherita, X-Burger..." value={name} onChange={e=>setName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                  <div className="flex gap-2">
                    <select value={categoryId} onChange={e=>setCategoryId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                      <option value="">Selecione uma categoria</option>
                      {categories.map((category) => (
                        <option key={category.category_id} value={category.category_id}>{category.name}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Nova categoria"
                      value={newCategory}
                      onChange={e=>setNewCategory(e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded-md w-32"
                    />
                    <Button type="button" size="xs" loading={addingCategory} onClick={handleAddCategory} disabled={!newCategory.trim() || addingCategory}>+</Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$) *</label>
                  <TextInput placeholder="0.00" value={price} onChange={e=>setPrice(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea placeholder="Descrição do produto..." value={description} onChange={e=>setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
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
                    <select value={selectedIngredient} onChange={e=>setSelectedIngredient(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Selecione um ingrediente</option>
                      {availableIngredients.map((ingredient) => (
                        <option key={ingredient.ingredient_id} value={ingredient.ingredient_id}>{ingredient.name} ({ingredient.unit})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                    <TextInput placeholder="0.00" value={quantity} onChange={e=>setQuantity(e.target.value)} />
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={handleAddIngredient} disabled={!selectedIngredient || !quantity} className="w-full">Adicionar</Button>
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
                                <Button size="xs" variant="secondary" color="red" onClick={()=>handleRemoveIngredient(ingredient.ingredient_id)}>Remover</Button>
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
                  <Text className="font-bold">Produto:</Text> {name}<br/>
                  <Text className="font-bold">Categoria:</Text> {categories.find(c=>c.category_id.toString()===categoryId)?.name}<br/>
                  <Text className="font-bold">Preço:</Text> {formatCurrency(Number(price))}<br/>
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
                  Custo total estimado: {formatCurrency(ingredients.reduce((acc, ing) => acc + (ing.ingredient.cost_per_unit * ing.quantity), 0))}
                </div>
              </div>
            )}

            {error && (<Text className="text-red-500 text-sm">{error}</Text>)}

            {/* Navegação do Wizard */}
            <div className="flex justify-between space-x-3">
              {step > 1 ? (
                <Button type="button" variant="secondary" onClick={()=>setStep(step-1)} disabled={loading}>Voltar</Button>
              ) : <span />}
              {step < 3 ? (
                <Button type="submit" disabled={loading}>{step===1?'Avançar':'Próximo'}</Button>
              ) : (
                <Button type="submit" loading={loading} disabled={loading}>Criar Ficha Técnica</Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 