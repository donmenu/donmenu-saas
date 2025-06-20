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

interface SuppliesTableProps {
  ingredients: Ingredient[];
  onUpdate: () => void;
}

export default function SuppliesTable({ ingredients, onUpdate }: SuppliesTableProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

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
    <div className="overflow-hidden">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-50">
            <TableHeaderCell className="font-semibold text-gray-700">Nome</TableHeaderCell>
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
                <div>
                  <Text className="font-medium text-gray-900">{ingredient.name}</Text>
                  <Text className="text-sm text-gray-500">ID: {ingredient.ingredient_id}</Text>
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
                <Text className="font-medium text-gray-700">
                  {ingredient.stock ? `${ingredient.stock} ${ingredient.unit}` : 'N/A'}
                </Text>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    size="xs"
                    variant="secondary"
                    icon={EyeIcon}
                    className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >
                    Ver
                  </Button>
                  <Button
                    size="xs"
                    variant="secondary"
                    icon={PencilIcon}
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
  );
}
