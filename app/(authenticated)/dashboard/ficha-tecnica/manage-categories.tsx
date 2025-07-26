'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text, Card, Badge } from '@tremor/react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Category {
  id: number;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  sort_order: number;
  active: boolean;
}

interface ManageCategoriesProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (category: Category) => void;
}

export default function ManageCategories({ isOpen, onClose, onCategorySelect }: ManageCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [icon, setIcon] = useState('📁');
  const [sortOrder, setSortOrder] = useState('0');

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Erro ao buscar categorias');
      }
      const data = await response.json();
      setCategories(data || []);
    } catch (err: any) {
      console.error('Erro ao buscar categorias:', err);
      setError('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('O nome da categoria é obrigatório');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const method = editingCategory ? 'PUT' : 'POST';
      const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          color: color.trim(),
          icon: icon.trim(),
          sort_order: parseInt(sortOrder) || 0
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar categoria');
      }

      const savedCategory = await response.json();
      
      if (editingCategory) {
        setCategories(categories.map(cat => 
          cat.id === editingCategory.id ? savedCategory : cat
        ));
      } else {
        setCategories([...categories, savedCategory]);
      }

      // Limpar formulário
      resetForm();
      setShowAddForm(false);
      setEditingCategory(null);
      
    } catch (err: any) {
      console.error('Erro ao salvar categoria:', err);
      setError(err.message || 'Erro ao salvar categoria');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || '');
    setColor(category.color || '#3B82F6');
    setIcon(category.icon || '📁');
    setSortOrder(category.sort_order.toString());
    setShowAddForm(true);
  };

  const handleDelete = async (categoryId: number) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao excluir categoria');
      }

      setCategories(categories.filter(cat => cat.id !== categoryId));
      
    } catch (err: any) {
      console.error('Erro ao excluir categoria:', err);
      setError(err.message || 'Erro ao excluir categoria');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setColor('#3B82F6');
    setIcon('📁');
    setSortOrder('0');
  };

  const handleCancel = () => {
    resetForm();
    setShowAddForm(false);
    setEditingCategory(null);
    setError('');
  };

  const handleSelectCategory = (category: Category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Title>Gerenciar Categorias</Title>
              <Text className="mt-2">Crie e gerencie categorias para suas fichas técnicas</Text>
            </div>
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Fechar
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <Text className="text-red-600">{error}</Text>
            </div>
          )}

          {/* Formulário de Adição/Edição */}
          {showAddForm && (
            <Card className="mb-6">
              <Title className="mb-4">
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </Title>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome da Categoria *
                    </label>
                    <TextInput
                      placeholder="Ex: Pratos Principais, Sobremesas..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ícone
                    </label>
                    <div className="flex gap-2">
                      <TextInput
                        placeholder="🍽️"
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        className="flex-1"
                      />
                      <div className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md">
                        <span className="text-lg">{icon}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cor
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded-md"
                      />
                      <TextInput
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ordem de Exibição
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    placeholder="Descrição da categoria..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button type="button" variant="secondary" onClick={handleCancel} disabled={loading}>
                    Cancelar
                  </Button>
                  <Button type="submit" loading={loading} disabled={loading}>
                    {editingCategory ? 'Salvar Alterações' : 'Criar Categoria'}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Lista de Categorias */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Title>Categorias Existentes</Title>
              {!showAddForm && (
                <Button
                  onClick={() => setShowAddForm(true)}
                  icon={PlusIcon}
                  disabled={loading}
                >
                  Nova Categoria
                </Button>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <Text className="ml-3 text-gray-500">Carregando categorias...</Text>
              </div>
            ) : categories.length === 0 ? (
              <Card className="text-center py-12">
                <Text className="text-gray-500 mb-4">Nenhuma categoria encontrada</Text>
                <Button onClick={() => setShowAddForm(true)} icon={PlusIcon}>
                  Criar Primeira Categoria
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card key={category.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <Title className="text-lg">{category.name}</Title>
                          {category.description && (
                            <Text className="text-sm text-gray-600">{category.description}</Text>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="xs"
                          variant="secondary"
                          icon={PencilIcon}
                          onClick={() => handleEdit(category)}
                        />
                        <Button
                          size="xs"
                          variant="secondary"
                          color="red"
                          icon={TrashIcon}
                          onClick={() => handleDelete(category.id)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge color="blue" className="text-xs">
                        Ordem: {category.sort_order}
                      </Badge>
                      {onCategorySelect && (
                        <Button
                          size="xs"
                          onClick={() => handleSelectCategory(category)}
                        >
                          Selecionar
                        </Button>
                      )}
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