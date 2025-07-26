'use client';

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Button,
  Badge
} from '@tremor/react';
import { useState } from 'react';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import type { Ingredient } from '../../../../types/ingredient';
import ViewSupply from './view-supply';
import EditSupply from './edit-supply';

interface SuppliesTableProps {
  ingredients: Ingredient[];
  onUpdate: () => void;
}

export default function SuppliesTable({ ingredients, onUpdate }: SuppliesTableProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [viewingSupply, setViewingSupply] = useState<Ingredient | null>(null);
  const [editingSupply, setEditingSupply] = useState<Ingredient | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este insumo?')) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/ingredients/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir insumo');
      }

      onUpdate();
    } catch (err: any) {
      console.error('Erro ao excluir insumo:', err);
      alert('Erro ao excluir insumo. Tente novamente.');
    } finally {
      setDeletingId(null);
    }
  };

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
    <>
      <div className="overflow-hidden">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableHeaderCell className="font-semibold text-gray-700">Produto</TableHeaderCell>
              <TableHeaderCell className="font-semibold text-gray-700">Unidade</TableHeaderCell>
              <TableHeaderCell className="font-semibold text-gray-700">Custo por Unidade</TableHeaderCell>
              <TableHeaderCell className="font-semibold text-gray-700">Estoque</TableHeaderCell>
              <TableHeaderCell className="font-semibold text-gray-700 text-center">Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient.ingredient_id} className="hover:bg-gray-50 transition-colors">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {/* Imagem do produto */}
                    <div className="flex-shrink-0">
                      {ingredient.image_url ? (
                        <img
                          src={ingredient.image_url}
                          alt={ingredient.name}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder-product.png';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">Sem foto</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Informações do produto */}
                    <div className="flex-1 min-w-0">
                      <Text className="font-medium text-gray-900 truncate">{ingredient.name}</Text>
                      <Text className="text-sm text-gray-500">ID: {ingredient.ingredient_id}</Text>
                      {ingredient.supplier && (
                        <Text className="text-xs text-gray-400">Fornecedor: {ingredient.supplier}</Text>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge color={getUnitBadgeColor(ingredient.unit)} className="font-medium">
                    {ingredient.unit}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-green-600">
                    {formatCurrency(Number(ingredient.cost_per_unit))}
                  </Text>
                </TableCell>
                <TableCell>
                  <div>
                    <Text className="font-medium text-gray-700">
                      {ingredient.current_stock ? `${ingredient.current_stock} ${ingredient.unit}` : 'N/A'}
                    </Text>
                    {ingredient.min_stock && (
                      <Text className="text-xs text-gray-500">
                        Mín: {ingredient.min_stock} {ingredient.unit}
                      </Text>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      size="xs"
                      variant="secondary"
                      icon={EyeIcon}
                      onClick={() => setViewingSupply(ingredient)}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      Ver
                    </Button>
                    <Button
                      size="xs"
                      variant="secondary"
                      icon={PencilIcon}
                      onClick={() => setEditingSupply(ingredient)}
                      className="bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                    >
                      Editar
                    </Button>
                    <Button
                      size="xs"
                      variant="secondary"
                      icon={TrashIcon}
                      color="red"
                      loading={deletingId === ingredient.ingredient_id}
                      onClick={() => handleDelete(ingredient.ingredient_id)}
                      className="bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal de Visualização */}
      <ViewSupply
        isOpen={!!viewingSupply}
        onClose={() => setViewingSupply(null)}
        supply={viewingSupply}
        onEdit={() => {
          setEditingSupply(viewingSupply);
          setViewingSupply(null);
        }}
      />

      {/* Modal de Edição */}
      <EditSupply
        isOpen={!!editingSupply}
        onClose={() => setEditingSupply(null)}
        onSuccess={() => {
          setEditingSupply(null);
          onUpdate();
        }}
        supply={editingSupply}
      />
    </>
  );
}
