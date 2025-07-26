'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text, Card, Badge } from '@tremor/react';
import { 
  SparklesIcon, 
  CalculatorIcon, 
  LightBulbIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface Menu {
  id: number;
  name: string;
  description?: string;
  type: string;
}

interface Recipe {
  id: number;
  name: string;
  total_cost: number;
  cost_per_yield: number;
  yield_quantity: number;
  yield_unit: string;
}

interface IntelligentAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: (product: any) => void;
}

interface PricingSuggestion {
  cost: number;
  suggestedPrice: number;
  margin: number;
  marginPercentage: number;
  competitivePrice: number;
  premiumPrice: number;
}

export default function IntelligentAssistant({ isOpen, onClose, onProductCreated }: IntelligentAssistantProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [targetMarket, setTargetMarket] = useState('standard');
  const [competitionLevel, setCompetitionLevel] = useState('medium');
  
  // Data states
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [pricingSuggestion, setPricingSuggestion] = useState<PricingSuggestion | null>(null);
  const [finalPrice, setFinalPrice] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchMenus();
      fetchCategories();
      fetchRecipes();
    }
  }, [isOpen]);

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

  const calculatePricing = () => {
    if (!selectedRecipe) return;

    const recipe = recipes.find(r => r.id.toString() === selectedRecipe);
    if (!recipe) return;

    const baseCost = recipe.cost_per_yield;
    
    // Fatores de mercado
    const marketMultipliers = {
      budget: 1.2,      // 20% de margem
      standard: 1.5,    // 50% de margem
      premium: 2.0,     // 100% de margem
      luxury: 3.0       // 200% de margem
    };

    // Fatores de competição
    const competitionMultipliers = {
      low: 1.1,         // 10% adicional
      medium: 1.0,      // Preço padrão
      high: 0.9         // 10% de desconto
    };

    const basePrice = baseCost * marketMultipliers[targetMarket as keyof typeof marketMultipliers];
    const competitivePrice = basePrice * competitionMultipliers[competitionLevel as keyof typeof competitionMultipliers];
    
    // Adicionar custos operacionais (15% do custo base)
    const operationalCosts = baseCost * 0.15;
    const finalSuggestedPrice = competitivePrice + operationalCosts;
    
    // Calcular margem
    const margin = finalSuggestedPrice - baseCost;
    const marginPercentage = (margin / finalSuggestedPrice) * 100;

    // Preços alternativos
    const premiumPrice = finalSuggestedPrice * 1.2;
    const budgetPrice = finalSuggestedPrice * 0.8;

    setPricingSuggestion({
      cost: baseCost,
      suggestedPrice: finalSuggestedPrice,
      margin,
      marginPercentage,
      competitivePrice: budgetPrice,
      premiumPrice
    });

    setFinalPrice(finalSuggestedPrice.toFixed(2));
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!productName.trim() || !selectedMenu || !selectedCategory) {
        setError('Nome do produto, cardápio e categoria são obrigatórios');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      if (!selectedRecipe) {
        setError('Selecione uma ficha técnica');
        return;
      }
      setError('');
      calculatePricing();
      setStep(3);
    }
  };

  const handleCreateProduct = async () => {
    if (!finalPrice || parseFloat(finalPrice) <= 0) {
      setError('Defina um preço válido');
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
          name: productName.trim(),
          description: productDescription.trim() || null,
          menu_id: parseInt(selectedMenu),
          price: parseFloat(finalPrice),
          category_id: parseInt(selectedCategory),
          recipe_id: parseInt(selectedRecipe),
          active: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar produto');
      }

      const createdProduct = await response.json();
      onProductCreated(createdProduct);
      onClose();
      
      // Reset form
      setProductName('');
      setProductDescription('');
      setSelectedMenu('');
      setSelectedCategory('');
      setSelectedRecipe('');
      setPreparationTime('');
      setDifficulty('');
      setTargetMarket('standard');
      setCompetitionLevel('medium');
      setPricingSuggestion(null);
      setFinalPrice('');
      setStep(1);
      
    } catch (err: any) {
      console.error('Erro ao criar produto:', err);
      setError(err.message || 'Erro ao criar produto');
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
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <Title>Assistente Inteligente de Produtos</Title>
                <Text className="mt-1">Crie produtos otimizados com precificação inteligente</Text>
              </div>
            </div>
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Fechar
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mb-8 gap-4">
            <div className={`flex-1 h-2 rounded ${step >= 1 ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 rounded ${step >= 2 ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 rounded ${step >= 3 ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <Text className="text-red-600">{error}</Text>
            </div>
          )}

          {/* Step 1: Informações Básicas */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <LightBulbIcon className="w-5 h-5 text-purple-500" />
                <Title className="text-lg">Informações do Produto</Title>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Produto *
                  </label>
                  <TextInput
                    placeholder="Ex: X-Burger Premium, Pizza Margherita..."
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardápio *
                  </label>
                  <select 
                    value={selectedMenu} 
                    onChange={(e) => setSelectedMenu(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Selecione um cardápio</option>
                    {menus.map((menu) => (
                      <option key={menu.id} value={menu.id.toString()}>
                        {menu.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria *
                  </label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id.toString()}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    placeholder="Descreva o produto, ingredientes especiais, etc..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNextStep} disabled={!productName.trim() || !selectedMenu || !selectedCategory}>
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Ficha Técnica e Configurações */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <CalculatorIcon className="w-5 h-5 text-purple-500" />
                <Title className="text-lg">Ficha Técnica e Configurações</Title>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ficha Técnica *
                  </label>
                  <select 
                    value={selectedRecipe} 
                    onChange={(e) => setSelectedRecipe(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Selecione uma ficha técnica</option>
                    {recipes.map((recipe) => (
                      <option key={recipe.id} value={recipe.id.toString()}>
                        {recipe.name} - {formatCurrency(recipe.cost_per_yield)}/{recipe.yield_unit}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tempo de Preparo (minutos)
                  </label>
                  <TextInput
                    placeholder="30"
                    value={preparationTime}
                    onChange={(e) => setPreparationTime(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dificuldade
                  </label>
                  <select 
                    value={difficulty} 
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Selecione a dificuldade</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Médio">Médio</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Público-Alvo
                  </label>
                  <select 
                    value={targetMarket} 
                    onChange={(e) => setTargetMarket(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="budget">Econômico</option>
                    <option value="standard">Padrão</option>
                    <option value="premium">Premium</option>
                    <option value="luxury">Luxo</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nível de Competição
                  </label>
                  <select 
                    value={competitionLevel} 
                    onChange={(e) => setCompetitionLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="secondary" onClick={() => setStep(1)}>
                  Voltar
                </Button>
                <Button onClick={handleNextStep} disabled={!selectedRecipe}>
                  Calcular Preço
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Precificação Inteligente */}
          {step === 3 && pricingSuggestion && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <CurrencyDollarIcon className="w-5 h-5 text-purple-500" />
                <Title className="text-lg">Precificação Inteligente</Title>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CalculatorIcon className="w-4 h-4 text-blue-500" />
                    <Text className="font-medium">Custo Base</Text>
                  </div>
                  <Title className="text-blue-600">{formatCurrency(pricingSuggestion.cost)}</Title>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ChartBarIcon className="w-4 h-4 text-green-500" />
                    <Text className="font-medium">Margem Sugerida</Text>
                  </div>
                  <Title className="text-green-600">{pricingSuggestion.marginPercentage.toFixed(1)}%</Title>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <StarIcon className="w-4 h-4 text-purple-500" />
                    <Text className="font-medium">Preço Sugerido</Text>
                  </div>
                  <Title className="text-purple-600">{formatCurrency(pricingSuggestion.suggestedPrice)}</Title>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="p-4">
                  <Title className="text-sm mb-2">Opções de Preço</Title>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Text className="text-sm">Econômico:</Text>
                      <Text className="text-sm font-medium">{formatCurrency(pricingSuggestion.competitivePrice)}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text className="text-sm">Padrão:</Text>
                      <Text className="text-sm font-medium">{formatCurrency(pricingSuggestion.suggestedPrice)}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text className="text-sm">Premium:</Text>
                      <Text className="text-sm font-medium">{formatCurrency(pricingSuggestion.premiumPrice)}</Text>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <Title className="text-sm mb-2">Análise de Mercado</Title>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Text className="text-sm">Público-alvo:</Text>
                      <Badge color="purple" className="text-xs">
                        {targetMarket === 'budget' ? 'Econômico' : 
                         targetMarket === 'standard' ? 'Padrão' :
                         targetMarket === 'premium' ? 'Premium' : 'Luxo'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <Text className="text-sm">Competição:</Text>
                      <Badge color="blue" className="text-xs">
                        {competitionLevel === 'low' ? 'Baixa' :
                         competitionLevel === 'medium' ? 'Média' : 'Alta'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <Text className="text-sm">Margem:</Text>
                      <Badge color="green" className="text-xs">
                        {pricingSuggestion.marginPercentage.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preço Final (R$)
                  </label>
                  <TextInput
                    placeholder="0.00"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button variant="secondary" onClick={() => setStep(2)}>
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleCreateProduct} 
                    loading={loading}
                    disabled={loading || !finalPrice || parseFloat(finalPrice) <= 0}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Criar Produto
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 