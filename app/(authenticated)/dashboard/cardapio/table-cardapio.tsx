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
import { PencilIcon, TrashIcon, EyeIcon, TagIcon } from '@heroicons/react/24/outline';
import type { Cardapio } from '../../../../types/cardapio';

interface CardapiosTableProps {
  cardapios: Cardapio[];
  onUpdate: () => void;
}

export default function CardapiosTable({ cardapios, onUpdate }: CardapiosTableProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este item do cardápio?')) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/cardapios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir item');
      }

      onUpdate();
    } catch (err: any) {
      console.error('Erro ao excluir item:', err);
      alert('Erro ao excluir item. Tente novamente.');
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'ativo':
        return <Badge color="green" className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'inativo':
        return <Badge color="red" className="bg-red-100 text-red-800">Inativo</Badge>;
      case 'em_breve':
        return <Badge color="yellow" className="bg-yellow-100 text-yellow-800">Em Breve</Badge>;
      default:
        return <Badge color="gray" className="bg-gray-100 text-gray-800">Indefinido</Badge>;
    }
  };

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-50">
            <TableHeaderCell className="font-semibold text-gray-700">Item</TableHeaderCell>
            <TableHeaderCell className="font-semibold text-gray-700">Status</TableHeaderCell>
            <TableHeaderCell className="font-semibold text-gray-700 text-center">Ações</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardapios.map((cardapio) => (
            <TableRow key={cardapio.id} className="hover:bg-gray-50 transition-colors">
              <TableCell>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <TagIcon className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <Text className="font-medium text-gray-900">{cardapio.item}</Text>
                    <Text className="text-sm text-gray-500">ID: {cardapio.id}</Text>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(cardapio.status)}
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
                    loading={deletingId === cardapio.id}
                    onClick={() => handleDelete(cardapio.id)}
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
