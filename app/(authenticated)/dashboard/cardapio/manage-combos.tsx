'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  TagIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ClockIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import type { Combo } from '../../../../types/combo';
import CreateCombo from './create-combo';
import EditCombo from './edit-combo';
import ViewCombo from './view-combo';

interface ManageCombosProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManageCombos({ isOpen, onClose }: ManageCombosProps) {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState<Combo | null>(null);
  const [viewingCombo, setViewingCombo] = useState<Combo | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchCombos();
    }
  }, [isOpen]);

  const fetchCombos = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/combos');
      if (!response.ok) {
        throw new Error('Erro ao buscar combos');
      }
      
      const data = await response.json();
      setCombos(data || []);
    } catch (error: any) {
      console.error('Erro ao buscar combos:', error);
      setError('Erro ao carregar combos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (comboId: number) => {
    if (!confirm('Tem certeza que deseja excluir este combo?')) {
      return;
    }

    try {
      setDeletingId(comboId);
      
      const response = await fetch(`/api/combos/${comboId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao excluir combo');
      }

      await fetchCombos();
    } catch (error: any) {
      console.error('Erro ao excluir combo:', error);
      alert(error.message || 'Erro ao excluir combo');
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

  const isComboValid = (combo: Combo) => {
    if (!combo.valid_from && !combo.valid_to) return true;
    
    const now = new Date();
    const validFrom = combo.valid_from ? new Date(combo.valid_from) : null;
    const validTo = combo.valid_to ? new Date(combo.valid_to) : null;
    
    if (validFrom && now < validFrom) return false;
    if (validTo && now > validTo) return false;
    
    return true;
  };

  const totalCombos = combos.length;
  const activeCombos = combos.filter(c => c.active).length;
  const validCombos = combos.filter(c => isComboValid(c)).length;
  const totalSavings = combos.reduce((sum, combo) => sum + (combo.total_savings || 0), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <Title className="text-2xl font-bold">Gerenciar Combos</Title>
              <Text className="text-gray-600 mt-1">Crie e gerencie combos de produtos</Text>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsCreateOpen(true)}
                icon={PlusIcon}
                className="bg-gradient-to-r from-green-600 to-green-700"
              >
                Criar Combo
              </Button>
              <Button
                onClick={onClose}
                variant="secondary"
              >
                Fechar
              </Button>
            </div>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text className="text-blue-600 font-medium">Total de Combos</Text>
                  <Metric className="text-blue-900">{totalCombos}</Metric>
                </div>
                <Badge color="blue" className="bg-blue-200 text-blue-800">
                  <ShoppingBagIcon className="w-4 h-4" />
                </Badge>
              </Flex>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text className="text-green-600 font-medium">Combos Ativos</Text>
                  <Metric className="text-green-900">{activeCombos}</Metric>
                </div>
                <Badge color="green" className="bg-green-200 text-green-800">
                  <TagIcon className="w-4 h-4" />
                </Badge>
              </Flex>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text className="text-purple-600 font-medium">Válidos</Text>
                  <Metric className="text-purple-900">{validCombos}</Metric>
                </div>
                <Badge color="purple" className="bg-purple-200 text-purple-800">
                  <ClockIcon className="w-4 h-4" />
                </Badge>
              </Flex>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text className="text-orange-600 font-medium">Total Economia</Text>
                  <Metric className="text-orange-900">{formatCurrency(totalSavings)}</Metric>
                </div>
                <Badge color="orange" className="bg-orange-200 text-orange-800">
                  <CurrencyDollarIcon className="w-4 h-4" />
                </Badge>
              </Flex>
            </Card>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Lista de Combos */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <Text className="ml-2">Carregando combos...</Text>
            </div>
          ) : combos.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <ShoppingBagIcon className="w-8 h-8 text-gray-400" />
                </div>
                <Title className="text-gray-500 mb-2">Nenhum combo encontrado</Title>
                <Text className="text-gray-400 mb-4">
                  Comece criando seu primeiro combo
                </Text>
                <Button
                  onClick={() => setIsCreateOpen(true)}
                  icon={PlusIcon}
                  className="bg-gradient-to-r from-green-600 to-green-700"
                >
                  Criar Primeiro Combo
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {combos.map((combo) => (
                <Card key={combo.id} className="relative">
                  {/* Imagem do Combo */}
                  {combo.image_url && (
                    <div className="mb-3">
                      <img 
                        src={combo.image_url} 
                        alt={combo.name}
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Header do Combo */}
                  <div className="flex justify-between items-start mb-2">
                    <Title className="text-lg">{combo.name}</Title>
                    <div className="flex gap-1">
                      {!combo.active && (
                        <Badge color="gray">Inativo</Badge>
                      )}
                      {!isComboValid(combo) && (
                        <Badge color="red">Expirado</Badge>
                      )}
                    </div>
                  </div>

                  {/* Descrição */}
                  {combo.description && (
                    <Text className="text-gray-600 mb-3">{combo.description}</Text>
                  )}

                  {/* Informações do Combo */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Preço do Combo:</span>
                      <span className="font-medium text-green-600">{formatCurrency(combo.price)}</span>
                    </div>
                    
                    {combo.total_original_price && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Preço Original:</span>
                        <span className="font-medium line-through text-gray-400">
                          {formatCurrency(combo.total_original_price)}
                        </span>
                      </div>
                    )}
                    
                    {combo.total_savings && combo.total_savings > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Economia:</span>
                        <span className="font-medium text-orange-600">
                          {formatCurrency(combo.total_savings)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Itens:</span>
                      <span className="font-medium">{combo.items?.length || 0}</span>
                    </div>
                    
                    {combo.discount && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Desconto:</span>
                        <span className="font-medium text-red-600">{combo.discount}%</span>
                      </div>
                    )}
                    
                    {combo.valid_from && combo.valid_to && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Validade:</span>
                        <span className={`font-medium ${!isComboValid(combo) ? 'text-red-600' : 'text-green-600'}`}>
                          {new Date(combo.valid_from).toLocaleDateString()} - {new Date(combo.valid_to).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setViewingCombo(combo)}
                      size="xs"
                      variant="secondary"
                      icon={EyeIcon}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      Ver
                    </Button>
                    <Button
                      onClick={() => setEditingCombo(combo)}
                      size="xs"
                      variant="secondary"
                      icon={PencilIcon}
                      className="bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(combo.id)}
                      size="xs"
                      variant="secondary"
                      color="red"
                      icon={TrashIcon}
                      loading={deletingId === combo.id}
                      className="bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Excluir
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modais */}
      <CreateCombo
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={() => {
          setIsCreateOpen(false);
          fetchCombos();
        }}
      />

      <EditCombo
        isOpen={!!editingCombo}
        onClose={() => setEditingCombo(null)}
        combo={editingCombo}
        onSuccess={() => {
          setEditingCombo(null);
          fetchCombos();
        }}
      />

      <ViewCombo
        isOpen={!!viewingCombo}
        onClose={() => setViewingCombo(null)}
        combo={viewingCombo}
        onEdit={(combo: Combo) => {
          setViewingCombo(null);
          setEditingCombo(combo);
        }}
      />
    </div>
  );
} 