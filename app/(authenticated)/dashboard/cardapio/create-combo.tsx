'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Button, Badge } from '@tremor/react';
import { 
  XMarkIcon, 
  PlusIcon, 
  TrashIcon,
  TagIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import type { MenuItem } from '../../../../types/combo';

interface CreateComboProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ComboItem {
  menu_item_id: number;
  quantity: number;
  discount?: number;
}

export default function CreateCombo({ isOpen, onClose, onSuccess }: CreateComboProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');
  const [items, setItems] = useState<ComboItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchMenuItems();
    }
  }, [isOpen]);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/cardapios');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const addItem = () => {
    setItems([...items, { menu_item_id: 0, quantity: 1, discount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof ComboItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateOriginalPrice = () => {
    return items.reduce((total, item) => {
      const menuItem = menuItems.find(mi => mi.id === item.menu_item_id);
      if (menuItem) {
        const itemPrice = menuItem.price * item.quantity;
        const itemDiscount = item.discount || 0;
        return total + (itemPrice * (1 - itemDiscount / 100));
      }
      return total;
    }, 0);
  };

  const calculateSuggestedPrice = () => {
    const originalPrice = calculateOriginalPrice();
    const comboDiscount = discount ? Number(discount) : 0;
    return originalPrice * (1 - comboDiscount / 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !price || items.length === 0) {
      setError('Nome, preço e pelo menos um item são obrigatórios');
      return;
    }

    if (items.some(item => item.menu_item_id === 0)) {
      setError('Todos os itens devem ter um produto selecionado');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const comboData = {
        name: name.trim(),
        description: description.trim() || undefined,
        price: Number(price),
        discount: discount ? Number(discount) : undefined,
        image_url: imageUrl.trim() || undefined,
        valid_from: validFrom || undefined,
        valid_to: validTo || undefined,
        items: items.map(item => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          discount: item.discount || undefined
        }))
      };

      const response = await fetch('/api/combos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comboData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar combo');
      }

      onSuccess();
      resetForm();
    } catch (error: any) {
      console.error('Erro ao criar combo:', error);
      setError(error.message || 'Erro ao criar combo');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setDiscount('');
    setImageUrl('');
    setValidFrom('');
    setValidTo('');
    setItems([]);
    setError('');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Title className="text-2xl font-bold">Criar Novo Combo</Title>
            <Button
              onClick={onClose}
              variant="secondary"
              size="sm"
              icon={XMarkIcon}
            >
              Fechar
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <Card>
              <Title className="mb-4">Informações do Combo</Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Nome do Combo *</Text>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Combo X-Burger + Batata + Refri"
                    required
                  />
                </div>

                <div>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Preço do Combo *</Text>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0,00"
                    required
                  />
                </div>

                <div>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Desconto (%)</Text>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <Text className="text-sm font-medium text-gray-700 mb-2">URL da Imagem</Text>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>

                <div>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Válido de</Text>
                  <input
                    type="datetime-local"
                    value={validFrom}
                    onChange={(e) => setValidFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Válido até</Text>
                  <input
                    type="datetime-local"
                    value={validTo}
                    onChange={(e) => setValidTo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">Descrição</Text>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva o combo..."
                />
              </div>
            </Card>

            {/* Cálculos de Preço */}
            {items.length > 0 && (
              <Card>
                <Title className="mb-4">Cálculos de Preço</Title>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Text className="text-sm text-gray-600">Preço Original</Text>
                    <Text className="text-lg font-bold text-gray-800">
                      {formatCurrency(calculateOriginalPrice())}
                    </Text>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Text className="text-sm text-blue-600">Preço Sugerido</Text>
                    <Text className="text-lg font-bold text-blue-800">
                      {formatCurrency(calculateSuggestedPrice())}
                    </Text>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Text className="text-sm text-green-600">Economia</Text>
                    <Text className="text-lg font-bold text-green-800">
                      {formatCurrency(calculateOriginalPrice() - Number(price || 0))}
                    </Text>
                  </div>
                </div>
              </Card>
            )}

            {/* Itens do Combo */}
            <Card>
              <div className="flex justify-between items-center mb-4">
                <Title>Itens do Combo</Title>
                <Button
                  onClick={addItem}
                  size="sm"
                  icon={PlusIcon}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Adicionar Item
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <TagIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <Text>Nenhum item adicionado</Text>
                  <Text className="text-sm">Clique em "Adicionar Item" para começar</Text>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Text className="font-medium">Item {index + 1}</Text>
                        <Button
                          onClick={() => removeItem(index)}
                          size="xs"
                          variant="secondary"
                          color="red"
                          icon={TrashIcon}
                        >
                          Remover
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Text className="text-sm font-medium text-gray-700 mb-2">Produto *</Text>
                          <select
                            value={item.menu_item_id}
                            onChange={(e) => updateItem(index, 'menu_item_id', Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value={0}>Selecione um produto</option>
                            {menuItems.map((menuItem) => (
                              <option key={menuItem.id} value={menuItem.id}>
                                {menuItem.name} - {formatCurrency(menuItem.price)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <Text className="text-sm font-medium text-gray-700 mb-2">Quantidade *</Text>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <Text className="text-sm font-medium text-gray-700 mb-2">Desconto (%)</Text>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            value={item.discount || ''}
                            onChange={(e) => updateItem(index, 'discount', Number(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      {item.menu_item_id > 0 && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <Text className="font-medium">
                                {menuItems.find(mi => mi.id === item.menu_item_id)?.name}
                              </Text>
                              <Text className="text-sm text-gray-600">
                                {item.quantity}x {formatCurrency(menuItems.find(mi => mi.id === item.menu_item_id)?.price || 0)}
                              </Text>
                            </div>
                            <div className="text-right">
                              <Text className="font-medium text-green-600">
                                {formatCurrency((menuItems.find(mi => mi.id === item.menu_item_id)?.price || 0) * item.quantity)}
                              </Text>
                              {item.discount && item.discount > 0 && (
                                <Text className="text-sm text-red-600">
                                  -{item.discount}%
                                </Text>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Error Display */}
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                onClick={onClose}
                variant="secondary"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={loading}
                className="bg-gradient-to-r from-green-600 to-green-700"
              >
                Criar Combo
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 