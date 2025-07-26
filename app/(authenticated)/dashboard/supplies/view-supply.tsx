'use client';

import { Button, Title, Text, Badge } from '@tremor/react';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import type { Ingredient } from '../../../../types/ingredient';

interface ViewSupplyProps {
  isOpen: boolean;
  onClose: () => void;
  supply: Ingredient | null;
  onEdit: () => void;
}

export default function ViewSupply({ isOpen, onClose, supply, onEdit }: ViewSupplyProps) {
  if (!isOpen || !supply) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getUnitBadgeColor = (unit: string) => {
    switch (unit.toLowerCase()) {
      case 'kg':
        return 'blue';
      case 'g':
        return 'cyan';
      case 'l':
        return 'green';
      case 'ml':
        return 'emerald';
      case 'unidade':
        return 'purple';
      default:
        return 'gray';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Title className="text-2xl font-bold text-gray-900">Detalhes do Insumo</Title>
              <Text className="text-gray-600 mt-1">Visualize todas as informações do insumo</Text>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="xs"
                variant="secondary"
                icon={PencilIcon}
                onClick={onEdit}
                className="bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                Editar
              </Button>
              <Button
                size="xs"
                variant="secondary"
                icon={XMarkIcon}
                onClick={onClose}
                className="bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                Fechar
              </Button>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="space-y-6">
            {/* Foto do produto */}
            {supply.image_url && (
              <div className="text-center">
                <div className="inline-block relative">
                  <img
                    src={supply.image_url}
                    alt={supply.name}
                    className="w-48 h-48 object-cover rounded-lg shadow-lg border-4 border-gray-100"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-product.png';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Informações básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nome</Text>
                <Text className="text-lg font-semibold text-gray-900 mt-1">{supply.name}</Text>
              </div>

              <div>
                <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide">Unidade</Text>
                <div className="mt-1">
                  <Badge color={getUnitBadgeColor(supply.unit)} className="text-sm">
                    {supply.unit}
                  </Badge>
                </div>
              </div>

              <div>
                <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide">Custo por Unidade</Text>
                <Text className="text-lg font-semibold text-green-600 mt-1">
                  {formatCurrency(Number(supply.cost_per_unit))}
                </Text>
              </div>

              <div>
                <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide">Estoque Atual</Text>
                <Text className="text-lg font-semibold text-gray-900 mt-1">
                  {supply.current_stock ? `${supply.current_stock} ${supply.unit}` : 'N/A'}
                </Text>
              </div>

              {supply.min_stock && (
                <div>
                  <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide">Estoque Mínimo</Text>
                  <Text className="text-lg font-semibold text-orange-600 mt-1">
                    {supply.min_stock} {supply.unit}
                  </Text>
                </div>
              )}

              {supply.supplier && (
                <div>
                  <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide">Fornecedor</Text>
                  <Text className="text-lg font-semibold text-gray-900 mt-1">{supply.supplier}</Text>
                </div>
              )}
            </div>

            {/* Descrição */}
            {supply.description && (
              <div>
                <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide">Descrição</Text>
                <Text className="text-gray-700 mt-1 leading-relaxed">{supply.description}</Text>
              </div>
            )}

            {/* Informações do sistema */}
            <div className="border-t border-gray-200 pt-4">
              <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Informações do Sistema</Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <Text className="text-gray-500">ID do Insumo</Text>
                  <Text className="font-mono text-gray-900">#{supply.ingredient_id}</Text>
                </div>
                {supply.created_at && (
                  <div>
                    <Text className="text-gray-500">Data de Criação</Text>
                    <Text className="text-gray-900">
                      {new Date(supply.created_at).toLocaleDateString('pt-BR')}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Fechar
            </Button>
            <Button
              onClick={onEdit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Editar Insumo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 