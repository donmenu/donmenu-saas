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

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Item</TableHeaderCell>
            <TableHeaderCell>Categoria</TableHeaderCell>
            <TableHeaderCell>Preço</TableHeaderCell>
            <TableHeaderCell>Custo</TableHeaderCell>
            <TableHeaderCell>Lucro</TableHeaderCell>
            <TableHeaderCell>Margem</TableHeaderCell>
            <TableHeaderCell>Ingredientes</TableHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fichasTecnicas.map((ficha) => {
            const profit = calculateProfit(ficha.item.price, ficha.total_cost);
            const margin = calculateMargin(ficha.item.price, ficha.total_cost);
            
            return (
              <TableRow key={ficha.ficha_id}>
                <TableCell>
                  <div>
                    <Text className="font-medium">{ficha.item.name}</Text>
                    <Text className="text-sm text-gray-500">{ficha.item.description}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge color="blue">{ficha.item.category.name}</Badge>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-green-600">
                    {formatCurrency(ficha.item.price)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text className="font-semibold text-red-600">
                    {formatCurrency(ficha.total_cost)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text className={`font-semibold ${profit && profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(profit)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text className={`font-semibold ${margin && margin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {margin ? `${margin.toFixed(1)}%` : '-'}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text className="text-sm text-gray-500">
                    {ficha.ficha_ingredientes.length} ingredientes
                  </Text>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => handleView(ficha)}
                    >
                      Visualizar
                    </Button>
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => handleEdit(ficha)}
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

      <ViewFichaTecnica
        isOpen={isViewModalOpen}
        onClose={handleViewClose}
        ficha={selectedFicha}
      />

      <EditFichaTecnica
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onSuccess={onUpdate}
        ficha={selectedFicha}
      />
    </>
  );
} 