'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Button, Badge } from '@tremor/react';
import { XMarkIcon, TagIcon, CurrencyDollarIcon, ShoppingBagIcon, PencilIcon, BeakerIcon } from '@heroicons/react/24/outline';
import type { Cardapio } from '../../../../types/cardapio';

interface ViewProductProps {
  isOpen: boolean;
  onClose: () => void;
  product: Cardapio | null;
  onEdit: (product: Cardapio) => void;
}

export default function ViewProduct({ isOpen, onClose, product, onEdit }: ViewProductProps) {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);

  useEffect(() => {
    if (isOpen && product?.recipe_id) {
      fetchIngredients();
    }
  }, [isOpen, product]);

  const fetchIngredients = async () => {
    if (!product?.recipe_id) return;
    
    try {
      setLoadingIngredients(true);
      const response = await fetch(`/api/ficha-tecnica/${product.recipe_id}`);
      if (response.ok) {
        const recipeData = await response.json();
        setIngredients(recipeData.ingredients || []);
      }
    } catch (error) {
      console.error('Erro ao buscar ingredientes:', error);
    } finally {
      setLoadingIngredients(false);
    }
  };

  if (!isOpen || !product) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Title>Detalhes do Produto</Title>
            <Button
              onClick={onClose}
              variant="secondary"
              size="sm"
              icon={XMarkIcon}
            >
              Fechar
            </Button>
          </div>

          {/* Imagem do Produto */}
          {product.image_url && (
            <div className="mb-6">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Informações do Produto */}
          <div className="space-y-4">
            <div>
              <Text className="text-sm font-medium text-gray-500">Nome do Produto</Text>
              <Title className="text-xl">{product.name}</Title>
            </div>

            {product.description && (
              <div>
                <Text className="text-sm font-medium text-gray-500">Descrição</Text>
                <Text className="text-gray-700">{product.description}</Text>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text className="text-sm font-medium text-gray-500">Preço</Text>
                <div className="flex items-center space-x-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                  <Title className="text-2xl text-green-600">{formatCurrency(product.price)}</Title>
                </div>
              </div>

              <div>
                <Text className="text-sm font-medium text-gray-500">Status</Text>
                <div className="mt-1">
                  <Badge color={product.active ? "green" : "gray"}>
                    {product.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text className="text-sm font-medium text-gray-500">Categoria</Text>
                <div className="flex items-center space-x-2 mt-1">
                  <TagIcon className="w-4 h-4 text-gray-400" />
                  <Text>{product.category?.name || 'Sem categoria'}</Text>
                </div>
              </div>

              <div>
                <Text className="text-sm font-medium text-gray-500">Cardápio</Text>
                <div className="flex items-center space-x-2 mt-1">
                  <ShoppingBagIcon className="w-4 h-4 text-gray-400" />
                  <Text>{product.menu?.name || 'Sem cardápio'}</Text>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text className="text-sm font-medium text-gray-500">ID do Produto</Text>
                <Text className="font-mono text-gray-600">#{product.id}</Text>
              </div>

              <div>
                <Text className="text-sm font-medium text-gray-500">Visível</Text>
                <Badge color={product.visible ? "green" : "gray"}>
                  {product.visible ? 'Sim' : 'Não'}
                </Badge>
              </div>
            </div>

            {/* Seção de Ingredientes */}
            {product.recipe_id && (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <BeakerIcon className="w-5 h-5 text-blue-600" />
                  <Text className="text-sm font-medium text-gray-500">Ingredientes</Text>
                </div>
                
                {loadingIngredients ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <Text className="ml-2 text-gray-500">Carregando ingredientes...</Text>
                  </div>
                ) : ingredients.length > 0 ? (
                  <div className="space-y-2">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <BeakerIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <Text className="font-medium">{ingredient.ingredient?.name || ingredient.name}</Text>
                            <Text className="text-sm text-gray-500">
                              {ingredient.quantity} {ingredient.unit}
                            </Text>
                          </div>
                        </div>
                        <div className="text-right">
                          <Text className="text-sm font-medium text-green-600">
                            {formatCurrency(ingredient.cost || 0)}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Text className="text-gray-500">Nenhum ingrediente encontrado</Text>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Ações */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={() => onEdit(product)}
              variant="secondary"
              icon={PencilIcon}
            >
              Editar Produto
            </Button>
            <Button
              onClick={onClose}
              variant="secondary"
            >
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 