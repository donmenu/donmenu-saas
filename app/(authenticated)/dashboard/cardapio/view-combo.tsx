'use client';

import { Card, Title, Text, Button, Badge } from '@tremor/react';
import { 
  XMarkIcon, 
  PencilIcon,
  TagIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import type { Combo } from '../../../../types/combo';

interface ViewComboProps {
  isOpen: boolean;
  onClose: () => void;
  combo: Combo | null;
  onEdit: (combo: Combo) => void;
}

export default function ViewCombo({ isOpen, onClose, combo, onEdit }: ViewComboProps) {
  if (!isOpen || !combo) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const isComboValid = () => {
    if (!combo.valid_from && !combo.valid_to) return true;
    
    const now = new Date();
    const validFrom = combo.valid_from ? new Date(combo.valid_from) : null;
    const validTo = combo.valid_to ? new Date(combo.valid_to) : null;
    
    if (validFrom && now < validFrom) return false;
    if (validTo && now > validTo) return false;
    
    return true;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Title className="text-2xl font-bold">Detalhes do Combo</Title>
            <div className="flex gap-2">
              <Button
                onClick={() => onEdit(combo)}
                variant="secondary"
                size="sm"
                icon={PencilIcon}
                className="bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
              >
                Editar
              </Button>
              <Button
                onClick={onClose}
                variant="secondary"
                size="sm"
                icon={XMarkIcon}
              >
                Fechar
              </Button>
            </div>
          </div>

          {/* Imagem do Combo */}
          {combo.image_url && (
            <div className="mb-6">
              <img 
                src={combo.image_url} 
                alt={combo.name}
                className="w-full h-64 object-cover rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Informações do Combo */}
          <div className="space-y-6">
            {/* Informações Básicas */}
            <Card>
              <div className="space-y-4">
                <div>
                  <Text className="text-sm font-medium text-gray-500">Nome do Combo</Text>
                  <Title className="text-xl">{combo.name}</Title>
                </div>

                {combo.description && (
                  <div>
                    <Text className="text-sm font-medium text-gray-500">Descrição</Text>
                    <Text className="text-gray-700">{combo.description}</Text>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Text className="text-sm font-medium text-gray-500">Preço do Combo</Text>
                    <div className="flex items-center space-x-2">
                      <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                      <Title className="text-2xl text-green-600">{formatCurrency(combo.price)}</Title>
                    </div>
                  </div>

                  <div>
                    <Text className="text-sm font-medium text-gray-500">Status</Text>
                    <div className="mt-1">
                      <Badge color={combo.active ? "green" : "gray"}>
                        {combo.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Text className="text-sm font-medium text-gray-500">Validade</Text>
                    <div className="mt-1">
                      <Badge color={isComboValid() ? "green" : "red"}>
                        {isComboValid() ? 'Válido' : 'Expirado'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Informações de Preço */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {combo.total_original_price && (
                    <div>
                      <Text className="text-sm font-medium text-gray-500">Preço Original</Text>
                      <Text className="text-lg font-medium line-through text-gray-400">
                        {formatCurrency(combo.total_original_price)}
                      </Text>
                    </div>
                  )}
                  
                  {combo.total_savings && combo.total_savings > 0 && (
                    <div>
                      <Text className="text-sm font-medium text-gray-500">Economia</Text>
                      <Text className="text-lg font-medium text-orange-600">
                        {formatCurrency(combo.total_savings)}
                      </Text>
                    </div>
                  )}
                  
                  {combo.discount && (
                    <div>
                      <Text className="text-sm font-medium text-gray-500">Desconto</Text>
                      <Text className="text-lg font-medium text-red-600">
                        {combo.discount}%
                      </Text>
                    </div>
                  )}
                </div>

                {/* Período de Validade */}
                {combo.valid_from && combo.valid_to && (
                  <div>
                    <Text className="text-sm font-medium text-gray-500">Período de Validade</Text>
                    <div className="flex items-center space-x-2 mt-1">
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      <Text className={`font-medium ${!isComboValid() ? 'text-red-600' : 'text-green-600'}`}>
                        {new Date(combo.valid_from).toLocaleDateString()} - {new Date(combo.valid_to).toLocaleDateString()}
                      </Text>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Itens do Combo */}
            <Card>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBagIcon className="w-5 h-5 text-blue-600" />
                <Title>Itens do Combo</Title>
                <Badge color="gray" className="ml-2">
                  {combo.items?.length || 0} {combo.items?.length === 1 ? 'item' : 'itens'}
                </Badge>
              </div>

              {!combo.items || combo.items.length === 0 ? (
                <div className="text-center py-8">
                  <Text className="text-gray-500">Nenhum item encontrado</Text>
                </div>
              ) : (
                <div className="space-y-4">
                  {combo.items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        {/* Imagem do Produto */}
                        <div className="flex-shrink-0">
                          {item.menu_item?.image_url ? (
                            <img 
                              src={item.menu_item.image_url} 
                              alt={item.menu_item.name}
                              className="w-16 h-16 rounded-lg object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <TagIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Informações do Item */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <Title className="text-lg">{item.menu_item?.name}</Title>
                              {item.menu_item?.description && (
                                <Text className="text-gray-600 mt-1">{item.menu_item.description}</Text>
                              )}
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <TagIcon className="w-4 h-4 mr-1" />
                                  {item.menu_item?.category?.name || 'Sem categoria'}
                                </span>
                                <span className="flex items-center">
                                  <ShoppingBagIcon className="w-4 h-4 mr-1" />
                                  {item.menu_item?.menu?.name || 'Sem cardápio'}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <Text className="text-sm text-gray-500">Quantidade:</Text>
                                <Badge color="blue">{item.quantity}</Badge>
                              </div>
                              {item.discount && item.discount > 0 && (
                                <div className="flex items-center space-x-2 mt-1">
                                  <Text className="text-sm text-gray-500">Desconto:</Text>
                                  <Badge color="red">-{item.discount}%</Badge>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Preços do Item */}
                          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Text className="text-sm text-gray-500">Preço Unitário</Text>
                              <Text className="font-medium">
                                {formatCurrency(item.menu_item?.price || 0)}
                              </Text>
                            </div>
                            <div>
                              <Text className="text-sm text-gray-500">Subtotal</Text>
                              <Text className="font-medium text-green-600">
                                {formatCurrency((item.menu_item?.price || 0) * item.quantity)}
                              </Text>
                            </div>
                            {item.discount && item.discount > 0 && (
                              <div>
                                <Text className="text-sm text-gray-500">Com Desconto</Text>
                                <Text className="font-medium text-red-600">
                                  {formatCurrency((item.menu_item?.price || 0) * item.quantity * (1 - item.discount / 100))}
                                </Text>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Resumo Financeiro */}
            <Card>
              <Title className="mb-4">Resumo Financeiro</Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Text className="text-sm text-gray-600">Preço Original Total</Text>
                  <Text className="text-2xl font-bold text-gray-800">
                    {formatCurrency(combo.total_original_price || 0)}
                  </Text>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <Text className="text-sm text-green-600">Preço do Combo</Text>
                  <Text className="text-2xl font-bold text-green-800">
                    {formatCurrency(combo.price)}
                  </Text>
                </div>
                {combo.total_savings && combo.total_savings > 0 && (
                  <div className="p-4 bg-orange-50 rounded-lg md:col-span-2">
                    <Text className="text-sm text-orange-600">Economia Total</Text>
                    <Text className="text-2xl font-bold text-orange-800">
                      {formatCurrency(combo.total_savings)}
                    </Text>
                  </div>
                )}
              </div>
            </Card>

            {/* Informações do Sistema */}
            <Card>
              <Title className="mb-4">Informações do Sistema</Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text className="text-sm font-medium text-gray-500">ID do Combo</Text>
                  <Text className="font-mono text-gray-600">#{combo.id}</Text>
                </div>
                <div>
                  <Text className="text-sm font-medium text-gray-500">Criado em</Text>
                  <Text className="text-gray-600">
                    {new Date(combo.created_at).toLocaleDateString()} às {new Date(combo.created_at).toLocaleTimeString()}
                  </Text>
                </div>
                <div>
                  <Text className="text-sm font-medium text-gray-500">Última atualização</Text>
                  <Text className="text-gray-600">
                    {new Date(combo.updated_at).toLocaleDateString()} às {new Date(combo.updated_at).toLocaleTimeString()}
                  </Text>
                </div>
                <div>
                  <Text className="text-sm font-medium text-gray-500">Restaurante ID</Text>
                  <Text className="font-mono text-gray-600">#{combo.restaurant_id}</Text>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 