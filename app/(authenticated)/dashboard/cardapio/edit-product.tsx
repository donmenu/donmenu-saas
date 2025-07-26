'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Button, TextInput } from '@tremor/react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import type { Cardapio } from '../../../../types/cardapio';

interface Category {
  id: number;
  name: string;
}

interface Menu {
  id: number;
  name: string;
}

interface EditProductProps {
  isOpen: boolean;
  onClose: () => void;
  product: Cardapio | null;
  onSuccess: () => void;
}

export default function EditProduct({ isOpen, onClose, product, onSuccess }: EditProductProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [active, setActive] = useState(true);
  const [visible, setVisible] = useState(true);
  
  // Data states
  const [categories, setCategories] = useState<Category[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchMenus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || '');
      setPrice(product.price.toString());
      setImageUrl(product.image_url || '');
      setSelectedCategory(product.category_id?.toString() || '');
      setSelectedMenu(product.menu_id.toString());
      setActive(product.active);
      setVisible(product.visible);
    }
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await fetch('/api/menus');
      if (response.ok) {
        const data = await response.json();
        setMenus(data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar menus:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !price || !selectedMenu) {
      setError('Nome, preço e cardápio são obrigatórios');
      return;
    }

    if (parseFloat(price) <= 0) {
      setError('O preço deve ser maior que zero');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`/api/cardapios/${product?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          price: parseFloat(price),
          image_url: imageUrl.trim() || null,
          category_id: selectedCategory ? parseInt(selectedCategory) : null,
          menu_id: parseInt(selectedMenu),
          active,
          visible
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar produto');
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erro ao atualizar produto:', error);
      setError(error.message || 'Erro ao atualizar produto');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setSelectedCategory('');
    setSelectedMenu('');
    setActive(true);
    setVisible(true);
    setError('');
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Title>Editar Produto</Title>
            <Button
              onClick={onClose}
              variant="secondary"
              size="sm"
              icon={XMarkIcon}
            >
              Fechar
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Produto *
                </label>
                <TextInput
                  placeholder="Ex: X-Burger Premium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Descrição do produto..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem
              </label>
              <div className="flex space-x-2">
                <TextInput
                  placeholder="https://exemplo.com/imagem.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  icon={PhotoIcon}
                />
              </div>
              {imageUrl && (
                <div className="mt-2">
                  <img 
                    src={imageUrl} 
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardápio *
                </label>
                <select
                  value={selectedMenu}
                  onChange={(e) => setSelectedMenu(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione um cardápio</option>
                  {menus.map((menu) => (
                    <option key={menu.id} value={menu.id.toString()}>
                      {menu.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id.toString()}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                  Produto Ativo
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="visible"
                  checked={visible}
                  onChange={(e) => setVisible(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="visible" className="text-sm font-medium text-gray-700">
                  Produto Visível
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                variant="secondary"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                Atualizar Produto
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 