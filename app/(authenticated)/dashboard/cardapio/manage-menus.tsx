'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text, Card, Badge } from '@tremor/react';
import { PlusIcon, PencilIcon, TrashIcon, CalendarIcon, TagIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

interface Menu {
  id: number;
  name: string;
  description?: string;
  type: string;
  is_promotional: boolean;
  discount_percentage?: number;
  valid_from?: string;
  valid_to?: string;
  image_url?: string;
  active: boolean;
  sort_order: number;
}

interface ManageMenusProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuSelect?: (menu: Menu) => void;
  onAddProduct?: (menuId: number) => void;
}

export default function ManageMenus({ isOpen, onClose, onMenuSelect, onAddProduct }: ManageMenusProps) {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  
  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('principal');
  const [isPromotional, setIsPromotional] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState('0');

  useEffect(() => {
    if (isOpen) {
      fetchMenus();
    }
  }, [isOpen]);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/menus');
      if (!response.ok) {
        throw new Error('Erro ao buscar cardápios');
      }
      const data = await response.json();
      setMenus(data || []);
    } catch (error) {
      console.error('Erro ao buscar cardápios:', error);
      setError('Erro ao carregar cardápios');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Nome do cardápio é obrigatório');
      return;
    }

    if (isPromotional && (!discountPercentage || parseFloat(discountPercentage) <= 0)) {
      setError('Desconto é obrigatório para cardápios promocionais');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const menuData = {
        name: name.trim(),
        description: description.trim() || null,
        type: type.trim(),
        is_promotional: isPromotional,
        discount_percentage: isPromotional ? parseFloat(discountPercentage) : null,
        valid_from: isPromotional && validFrom ? new Date(validFrom).toISOString() : null,
        valid_to: isPromotional && validTo ? new Date(validTo).toISOString() : null,
        image_url: imageUrl.trim() || null,
        sort_order: parseInt(sortOrder) || 0
      };

      const url = editingMenu ? `/api/menus/${editingMenu.id}` : '/api/menus';
      const method = editingMenu ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar cardápio');
      }

      await fetchMenus();
      resetForm();
      setShowAddForm(false);
    } catch (error: any) {
      console.error('Erro ao salvar cardápio:', error);
      setError(error.message || 'Erro ao salvar cardápio');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (menu: Menu) => {
    setEditingMenu(menu);
    setName(menu.name);
    setDescription(menu.description || '');
    setType(menu.type);
    setIsPromotional(menu.is_promotional);
    setDiscountPercentage(menu.discount_percentage?.toString() || '');
    setValidFrom(menu.valid_from ? new Date(menu.valid_from).toISOString().split('T')[0] : '');
    setValidTo(menu.valid_to ? new Date(menu.valid_to).toISOString().split('T')[0] : '');
    setImageUrl(menu.image_url || '');
    setSortOrder(menu.sort_order.toString());
    setShowAddForm(true);
  };

  const handleDelete = async (menuId: number) => {
    if (!confirm('Tem certeza que deseja excluir este cardápio?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/menus/${menuId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao excluir cardápio');
      }

      await fetchMenus();
    } catch (error: any) {
      console.error('Erro ao excluir cardápio:', error);
      setError(error.message || 'Erro ao excluir cardápio');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingMenu(null);
    setName('');
    setDescription('');
    setType('principal');
    setIsPromotional(false);
    setDiscountPercentage('');
    setValidFrom('');
    setValidTo('');
    setImageUrl('');
    setSortOrder('0');
    setError('');
  };

  const handleSelectMenu = (menu: Menu) => {
    if (onMenuSelect) {
      onMenuSelect(menu);
      onClose();
    }
  };

  const isPromotionalValid = (menu: Menu) => {
    if (!menu.is_promotional) return true;
    
    const now = new Date();
    const validFrom = menu.valid_from ? new Date(menu.valid_from) : null;
    const validTo = menu.valid_to ? new Date(menu.valid_to) : null;
    
    if (validFrom && now < validFrom) return false;
    if (validTo && now > validTo) return false;
    
    return true;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Title>Gerenciar Cardápios</Title>
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                icon={PlusIcon}
                size="sm"
              >
                Novo Cardápio
              </Button>
              <Button 
                onClick={onClose}
                variant="secondary"
                size="sm"
              >
                Fechar
              </Button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Add/Edit Form */}
          {showAddForm && (
            <Card className="mb-6">
              <Title className="mb-4">
                {editingMenu ? 'Editar Cardápio' : 'Novo Cardápio'}
              </Title>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome *
                    </label>
                    <TextInput
                      placeholder="Ex: Cardápio Principal, Promoção de Verão..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="principal">Principal</option>
                      <option value="delivery">Delivery</option>
                      <option value="sobremesas">Sobremesas</option>
                      <option value="bebidas">Bebidas</option>
                      <option value="promocional">Promocional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ordem
                    </label>
                    <input
                      type="number"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL da Imagem
                    </label>
                    <TextInput
                      placeholder="https://exemplo.com/imagem.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Descrição do cardápio..."
                  />
                </div>

                {/* Promotional Fields */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="isPromotional"
                      checked={isPromotional}
                      onChange={(e) => setIsPromotional(e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="isPromotional" className="text-sm font-medium text-gray-700">
                      Cardápio Promocional
                    </label>
                  </div>

                  {isPromotional && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Desconto (%) *
                        </label>
                        <input
                          type="number"
                          value={discountPercentage}
                          onChange={(e) => setDiscountPercentage(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          min="0"
                          max="100"
                          step="0.01"
                          required={isPromotional}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Válido de
                        </label>
                        <input
                          type="date"
                          value={validFrom}
                          onChange={(e) => setValidFrom(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Válido até
                        </label>
                        <input
                          type="date"
                          value={validTo}
                          onChange={(e) => setValidTo(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    onClick={() => {
                      resetForm();
                      setShowAddForm(false);
                    }}
                    variant="secondary"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    loading={loading}
                  >
                    {editingMenu ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Menus List */}
          <div className="space-y-4">
            {loading && !showAddForm ? (
              <div className="text-center py-8">
                <Text>Carregando cardápios...</Text>
              </div>
            ) : menus.length === 0 ? (
              <Card>
                <div className="text-center py-8">
                  <Text>Nenhum cardápio encontrado</Text>
                  <Button 
                    onClick={() => {
                      resetForm();
                      setShowAddForm(true);
                    }}
                    className="mt-4"
                    icon={PlusIcon}
                  >
                    Criar Primeiro Cardápio
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menus.map((menu) => (
                  <Card key={menu.id} className="relative">
                    {menu.image_url && (
                      <div className="mb-3">
                        <img 
                          src={menu.image_url} 
                          alt={menu.name}
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-2">
                      <Title className="text-lg">{menu.name}</Title>
                      <div className="flex gap-1">
                        {menu.is_promotional && (
                          <Badge color="red" icon={TagIcon}>
                            Promoção
                          </Badge>
                        )}
                        {!menu.active && (
                          <Badge color="gray">Inativo</Badge>
                        )}
                      </div>
                    </div>

                    {menu.description && (
                      <Text className="text-gray-600 mb-2">{menu.description}</Text>
                    )}

                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tipo:</span>
                        <span className="font-medium">{menu.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Ordem:</span>
                        <span className="font-medium">{menu.sort_order}</span>
                      </div>
                      {menu.is_promotional && menu.discount_percentage && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Desconto:</span>
                          <span className="font-medium text-red-600">
                            {menu.discount_percentage}%
                          </span>
                        </div>
                      )}
                      {menu.is_promotional && (menu.valid_from || menu.valid_to) && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Validade:</span>
                          <span className={`font-medium ${!isPromotionalValid(menu) ? 'text-red-600' : 'text-green-600'}`}>
                            {menu.valid_from && menu.valid_to 
                              ? `${new Date(menu.valid_from).toLocaleDateString()} - ${new Date(menu.valid_to).toLocaleDateString()}`
                              : menu.valid_from 
                                ? `A partir de ${new Date(menu.valid_from).toLocaleDateString()}`
                                : `Até ${new Date(menu.valid_to!).toLocaleDateString()}`
                            }
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {onAddProduct && (
                        <Button 
                          onClick={() => onAddProduct(menu.id)}
                          size="xs"
                          variant="secondary"
                          icon={ShoppingBagIcon}
                          className="bg-green-50 text-green-600 hover:bg-green-100"
                        >
                          Adicionar Produto
                        </Button>
                      )}
                      {onMenuSelect && (
                        <Button 
                          onClick={() => handleSelectMenu(menu)}
                          size="xs"
                          variant="secondary"
                        >
                          Selecionar
                        </Button>
                      )}
                      <Button 
                        onClick={() => handleEdit(menu)}
                        size="xs"
                        variant="secondary"
                        icon={PencilIcon}
                      >
                        Editar
                      </Button>
                      <Button 
                        onClick={() => handleDelete(menu.id)}
                        size="xs"
                        variant="secondary"
                        color="red"
                        icon={TrashIcon}
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
      </div>
    </div>
  );
} 