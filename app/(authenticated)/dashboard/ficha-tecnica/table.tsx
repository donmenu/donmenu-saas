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
  ficha_id: number
  item_id: number
  yield: number | null
  total_cost: number | null
  price_suggestion: number | null
  created_at: string
  item: {
    item_id: number
    name: string
    description: string
    price: number
    category: {
      category_id: number
      name: string
    }
  }
  ficha_ingredientes: {
    id: number
    quantity: number
    ingredient: {
      ingredient_id: number
      name: string
      unit: string
      cost_per_unit: number
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

  const formatCurrency = (value: number | null) => {
    if (value === null) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateProfit = (price: number, cost: number | null) => {
    if (cost === null) return null;
    return price - cost;
  };

  const calculateMargin = (price: number, cost: number | null) => {
    if (cost === null || cost === 0) return null;
    return ((price - cost) / price) * 100;
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
            <TableRow className="border-b border-gray-200">
              <TableHeaderCell className="text-left font-semibold text-gray-900">Item</TableHeaderCell>
              <TableHeaderCell className="text-left font-semibold text-gray-900">Categoria</TableHeaderCell>
              <TableHeaderCell className="text-right font-semibold text-gray-900">Preço</TableHeaderCell>
              <TableHeaderCell className="text-right font-semibold text-gray-900">Custo</TableHeaderCell>
              <TableHeaderCell className="text-right font-semibold text-gray-900">Lucro</TableHeaderCell>
              <TableHeaderCell className="text-right font-semibold text-gray-900">Margem</TableHeaderCell>
              <TableHeaderCell className="text-center font-semibold text-gray-900">Ingredientes</TableHeaderCell>
              <TableHeaderCell className="text-center font-semibold text-gray-900">Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fichasTecnicas.map((ficha) => {
              const profit = calculateProfit(ficha.item.price, ficha.total_cost);
              const margin = calculateMargin(ficha.item.price, ficha.total_cost);
              
              return (
                <TableRow key={ficha.ficha_id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div>
                      <Text className="font-semibold text-gray-900">{ficha.item.name}</Text>
                      <Text className="text-sm text-gray-500">{ficha.item.description}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color="blue" className="bg-blue-100 text-blue-800 border-0">
                      {ficha.item.category.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Text className="font-semibold text-green-600">
                      {formatCurrency(ficha.item.price)}
                    </Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <Text className="font-semibold text-red-600">
                      {formatCurrency(ficha.total_cost)}
                    </Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <Text className={`font-semibold ${getProfitColor(profit)}`}>
                      {formatCurrency(profit)}
                    </Text>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge color={getMarginColor(margin)} className="font-semibold">
                      {margin ? `${margin.toFixed(1)}%` : '-'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge color="gray" className="bg-gray-100 text-gray-700 border-0">
                      {ficha.ficha_ingredientes.length} ingredientes
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        size="xs"
                        variant="secondary"
                        onClick={() => handleView(ficha)}
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0"
                      >
                        Visualizar
                      </Button>
                      <Button
                        size="xs"
                        variant="secondary"
                        onClick={() => handleEdit(ficha)}
                        className="bg-green-50 text-green-700 hover:bg-green-100 border-0"
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
          item_id: selectedFicha.item_id,
          name: selectedFicha.item.name,
          description: selectedFicha.item.description,
          price: selectedFicha.item.price,
          categories: selectedFicha.item.category
        } : null}
      />

      <EditFichaTecnica
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onSuccess={onUpdate}
        item={selectedFicha ? {
          item_id: selectedFicha.item_id,
          name: selectedFicha.item.name,
          description: selectedFicha.item.description,
          price: selectedFicha.item.price,
          categories: selectedFicha.item.category
        } : null}
      />
    </>
  );
} 