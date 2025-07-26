'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Title, Text } from '@tremor/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Ingredient } from '../../../../types/ingredient';

interface EditSupplyProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  supply: Ingredient | null;
}

export default function EditSupply({ isOpen, onClose, onSuccess, supply }: EditSupplyProps) {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [costPerUnit, setCostPerUnit] = useState('');
  const [description, setDescription] = useState('');
  const [supplier, setSupplier] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [minStock, setMinStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (supply) {
      setName(supply.name || '');
      setUnit(supply.unit || '');
      setCostPerUnit(supply.cost_per_unit?.toString() || '');
      setDescription(supply.description || '');
      setSupplier(supply.supplier || '');
      setCurrentStock(supply.current_stock?.toString() || '');
      setMinStock(supply.min_stock?.toString() || '');
      setImageUrl(supply.image_url || '');
    }
  }, [supply]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supply) return;
    
    if (!name.trim()) {
      setError('O nome do insumo é obrigatório');
      return;
    }

    if (!unit.trim()) {
      setError('A unidade é obrigatória');
      return;
    }

    if (!costPerUnit || parseFloat(costPerUnit) <= 0) {
      setError('O custo por unidade deve ser maior que zero');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/ingredients/${supply.ingredient_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          unit: unit.trim(),
          cost_per_unit: parseFloat(costPerUnit),
          description: description.trim() || null,
          supplier: supplier.trim() || null,
          current_stock: currentStock ? parseFloat(currentStock) : 0,
          min_stock: minStock ? parseFloat(minStock) : null,
          image_url: imageUrl.trim() || null
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao atualizar insumo');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Erro ao atualizar insumo:', err);
      setError('Erro ao atualizar insumo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !supply) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <Title>Editar Insumo</Title>
          <Text className="mt-2">Edite os dados do insumo</Text>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Insumo *
              </label>
              <TextInput
                id="name"
                placeholder="Ex: Farinha, Tomate, Queijo..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Imagem */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem
              </label>
              <div className="flex space-x-2">
                <TextInput
                  id="imageUrl"
                  placeholder="https://exemplo.com/imagem.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1"
                />
                {imageUrl && (
                  <Button
                    type="button"
                    size="xs"
                    variant="secondary"
                    icon={XMarkIcon}
                    onClick={() => setImageUrl('')}
                    className="bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    Limpar
                  </Button>
                )}
              </div>
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Unidade e Custo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                  Unidade *
                </label>
                <select
                  id="unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione uma unidade</option>
                  <option value="kg">Quilograma (kg)</option>
                  <option value="g">Grama (g)</option>
                  <option value="l">Litro (L)</option>
                  <option value="ml">Mililitro (ml)</option>
                  <option value="un">Unidade (un)</option>
                  <option value="pct">Pacote (pct)</option>
                  <option value="cx">Caixa (cx)</option>
                  <option value="lata">Lata</option>
                  <option value="garrafa">Garrafa</option>
                </select>
              </div>

              <div>
                <label htmlFor="costPerUnit" className="block text-sm font-medium text-gray-700 mb-1">
                  Custo por Unidade (R$) *
                </label>
                <TextInput
                  id="costPerUnit"
                  placeholder="0.00"
                  value={costPerUnit}
                  onChange={(e) => setCostPerUnit(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Estoque */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="currentStock" className="block text-sm font-medium text-gray-700 mb-1">
                  Estoque Atual
                </label>
                <TextInput
                  id="currentStock"
                  placeholder="0.00"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="minStock" className="block text-sm font-medium text-gray-700 mb-1">
                  Estoque Mínimo
                </label>
                <TextInput
                  id="minStock"
                  placeholder="0.00"
                  value={minStock}
                  onChange={(e) => setMinStock(e.target.value)}
                />
              </div>
            </div>

            {/* Fornecedor */}
            <div>
              <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">
                Fornecedor
              </label>
              <TextInput
                id="supplier"
                placeholder="Nome do fornecedor"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </div>

            {/* Descrição */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="description"
                placeholder="Descrição detalhada do insumo..."
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {error && (
              <Text className="text-red-500 text-sm">{error}</Text>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={loading}
              >
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 