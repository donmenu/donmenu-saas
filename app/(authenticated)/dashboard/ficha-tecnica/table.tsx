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
import { ViewFichaTecnica, EditFichaTecnica } from './index';

interface FichaTecnica {
  id: number
  restaurant_id: number
  category_id: number | null
  name: string
  description: string | null
  yield_quantity: string
  yield_unit: string
  preparation_time: number | null
  difficulty: string | null
  instructions: string | null
  image_url: string | null
  active: boolean
  created_at: string
  updated_at: string
  total_cost: string | null
  cost_per_yield: string | null
  category: {
    id: number
    name: string
    description: string | null
    color: string | null
    icon: string | null
  } | null
  ingredients: {
    id: number
    restaurant_id: number
    recipe_id: number
    ingredient_id: number
    quantity: string
    unit: string
    cost: string | null
    notes: string | null
    created_at: string
    updated_at: string
    ingredient: {
      id: number
      name: string
      description: string | null
      unit: string
      cost_per_unit: string
      supplier: string | null
    }
  }[]
}

interface FichaTecnicaTableProps {
  fichasTecnicas: FichaTecnica[];
  onUpdate: () => void;
}

export default function FichaTecnicaTable({ fichasTecnicas, onUpdate }: FichaTecnicaTableProps) {
  const [selectedFicha, setSelectedFicha] = useState<FichaTecnica | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleView = (ficha: FichaTecnica) => {
    setSelectedFicha(ficha);
    setIsViewModalOpen(true);
  };

  const handleEdit = (ficha: FichaTecnica) => {
    setSelectedFicha(ficha);
    setIsEditModalOpen(true);
  };

  const handleViewClose = () => {
    setIsViewModalOpen(false);
    setSelectedFicha(null);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setSelectedFicha(null);
  };

  const formatCurrency = (value: string | null) => {
    if (value === null) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(value));
  };

  const calculateProfit = (cost: string | null) => {
    if (cost === null) return null;
    // Estimativa de preço baseada no custo + margem de 60%
    const costValue = parseFloat(cost);
    const estimatedPrice = costValue * 1.6; // 60% de margem
    return estimatedPrice - costValue;
  };

  const calculateMargin = (cost: string | null) => {
    if (cost === null || parseFloat(cost) === 0) return null;
    // Margem estimada de 60%
    return 60;
  };

  const getMarginColor = (margin: number | null) => {
    if (margin === null) return 'gray';
    if (margin >= 50) return 'green';
    if (margin >= 30) return 'blue';
    if (margin >= 15) return 'orange';
    return 'red';
  };

  const getProfitColor = (profit: number | null) => {
    if (profit === null) return 'gray';
    if (profit > 0) return 'green';
    return 'red';
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow className="border-b border-gray-200 dark:border-gray-700">
              <TableHeaderCell className="text-left font-semibold text-gray-900 dark:text-white">Receita</TableHeaderCell>
              <TableHeaderCell className="text-left font-semibold text-gray-900 dark:text-white">Categoria</TableHeaderCell>
              <TableHeaderCell className="text-right font-semibold text-gray-900 dark:text-white">Rendimento</TableHeaderCell>
              <TableHeaderCell className="text-right font-semibold text-gray-900 dark:text-white">Custo</TableHeaderCell>
              <TableHeaderCell className="text-right font-semibold text-gray-900 dark:text-white">Lucro Est.</TableHeaderCell>
              <TableHeaderCell className="text-right font-semibold text-gray-900 dark:text-white">Margem</TableHeaderCell>
              <TableHeaderCell className="text-center font-semibold text-gray-900 dark:text-white">Ingredientes</TableHeaderCell>
              <TableHeaderCell className="text-center font-semibold text-gray-900 dark:text-white">Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fichasTecnicas.map((ficha) => {
              const profit = calculateProfit(ficha.total_cost);
              const margin = calculateMargin(ficha.total_cost);
              
              return (
                <TableRow key={ficha.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <TableCell>
                    <div>
                      <Text className="font-semibold text-gray-900 dark:text-white">{ficha.name}</Text>
                      <Text className="text-sm text-gray-500 dark:text-gray-400">{ficha.description}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color="blue" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0">
                      {ficha.category?.name || 'Sem categoria'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Text className="font-semibold text-green-600 dark:text-green-400">
                      {ficha.yield_quantity} {ficha.yield_unit}
                    </Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <Text className="font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(ficha.total_cost)}
                    </Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <Text className={`font-semibold ${getProfitColor(profit)}`}>
                      {formatCurrency(profit ? profit.toFixed(2) : null)}
                    </Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge color={getMarginColor(margin)} className="font-semibold">
                      {margin ? `${margin.toFixed(1)}%` : '-'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge color="gray" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0">
                      {ficha.ingredients.length} ingredientes
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        size="xs"
                        variant="secondary"
                        onClick={() => handleView(ficha)}
                        className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40 border-0"
                      >
                        Visualizar
                      </Button>
                      <Button
                        size="xs"
                        variant="secondary"
                        onClick={() => handleEdit(ficha)}
                        className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/40 border-0"
                      >
                        Editar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <ViewFichaTecnica
        isOpen={isViewModalOpen}
        onClose={handleViewClose}
        item={selectedFicha ? {
          item_id: selectedFicha.id,
          name: selectedFicha.name,
          description: selectedFicha.description || '',
          price: parseFloat(selectedFicha.total_cost || '0'),
          categories: {
            category_id: selectedFicha.category?.id || 0,
            name: selectedFicha.category?.name || ''
          }
        } : null}
      />

      <EditFichaTecnica
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onSuccess={() => {
          handleEditClose();
          onUpdate();
        }}
        item={selectedFicha ? {
          item_id: selectedFicha.id,
          name: selectedFicha.name,
          description: selectedFicha.description || '',
          price: parseFloat(selectedFicha.total_cost || '0'),
          categories: {
            category_id: selectedFicha.category?.id || 0,
            name: selectedFicha.category?.name || ''
          }
        } : null}
      />
    </>
  );
}
