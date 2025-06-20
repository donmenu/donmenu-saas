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
import { PencilIcon, TrashIcon, EyeIcon, UserIcon } from '@heroicons/react/24/outline';
import type { User } from '../../../../types/user';

interface UsersTableProps {
  users: User[];
  onUpdate: () => void;
}

export default function UsersTable({ users, onUpdate }: UsersTableProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
      }

      onUpdate();
    } catch (err: any) {
      console.error('Erro ao excluir usuário:', err);
      alert('Erro ao excluir usuário. Tente novamente.');
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (user: User) => {
    if (user.email && user.username) {
      return <Badge color="green" className="bg-green-100 text-green-800">Completo</Badge>;
    } else if (user.email || user.username) {
      return <Badge color="yellow" className="bg-yellow-100 text-yellow-800">Parcial</Badge>;
    } else {
      return <Badge color="red" className="bg-red-100 text-red-800">Básico</Badge>;
    }
  };

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-50">
            <TableHeaderCell className="font-semibold text-gray-700">Usuário</TableHeaderCell>
            <TableHeaderCell className="font-semibold text-gray-700">Email</TableHeaderCell>
            <TableHeaderCell className="font-semibold text-gray-700">Username</TableHeaderCell>
            <TableHeaderCell className="font-semibold text-gray-700">Status</TableHeaderCell>
            <TableHeaderCell className="font-semibold text-gray-700 text-center">Ações</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
              <TableCell>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <Text className="font-medium text-gray-900">{user.name || 'Sem nome'}</Text>
                    <Text className="text-sm text-gray-500">ID: {user.id}</Text>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Text className="text-gray-700">
                  {user.email || '-'}
                </Text>
              </TableCell>
              <TableCell>
                <Text className="text-gray-700">
                  {user.username || '-'}
                </Text>
              </TableCell>
              <TableCell>
                {getStatusBadge(user)}
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
                    loading={deletingId === user.id}
                    onClick={() => handleDelete(user.id)}
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
