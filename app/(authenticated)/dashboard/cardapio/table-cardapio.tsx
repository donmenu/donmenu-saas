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
import ViewProduct from './view-product';
import EditProduct from './edit-product';

interface CardapiosTableProps {
  cardapios: Cardapio[];
  onUpdate: () => void;
}

export default function CardapiosTable({ cardapios, onUpdate }: CardapiosTableProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Cardapio | null>(null);
  const [editingProduct, setEditingProduct] = useState<Cardapio | null>(null);

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

  const getStatusBadge = (active: boolean) => {
    return active ? 
      <Badge color="green" className="bg-green-100 text-green-800">Ativo</Badge> :
      <Badge color="red" className="bg-red-100 text-red-800">Inativo</Badge>;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-50">
            <TableHeaderCell className="font-semibold text-gray-700">Produto</TableHeaderCell>
            <TableHeaderCell className="font-semibold text-gray-700">Preço</TableHeaderCell>
            <TableHeaderCell className="font-semibold text-gray-700">Categoria</TableHeaderCell>
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
                    {cardapio.image_url ? (
                      <img 
                        src={cardapio.image_url} 
                        alt={cardapio.name}
                        className="w-12 h-12 rounded-lg object-cover border"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center ${cardapio.image_url ? 'hidden' : ''}`}>
                      <TagIcon className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <Text className="font-medium text-gray-900">{cardapio.name}</Text>
                    <Text className="text-sm text-gray-500">ID: {cardapio.id}</Text>
                    {cardapio.description && (
                      <Text className="text-xs text-gray-400 line-clamp-1">{cardapio.description}</Text>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Text className="font-medium text-green-600">{formatCurrency(cardapio.price)}</Text>
              </TableCell>
              <TableCell>
                <Text className="text-sm text-gray-600">
                  {cardapio.category?.name || 'Sem categoria'}
                </Text>
              </TableCell>
              <TableCell>
                {getStatusBadge(cardapio.active)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    size="xs"
                    variant="secondary"
                    icon={EyeIcon}
                    onClick={() => setViewingProduct(cardapio)}
                    className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >
                    Ver
                  </Button>
                  <Button
                    size="xs"
                    variant="secondary"
                    icon={PencilIcon}
                    onClick={() => setEditingProduct(cardapio)}
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

      {/* Modais */}
      <ViewProduct
        isOpen={!!viewingProduct}
        onClose={() => setViewingProduct(null)}
        product={viewingProduct}
        onEdit={(product: Cardapio) => {
          setViewingProduct(null);
          setEditingProduct(product);
        }}
      />

      <EditProduct
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        product={editingProduct}
        onSuccess={() => {
          setEditingProduct(null);
          onUpdate();
        }}
      />
    </div>
  );
}
