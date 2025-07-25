'use client';

import { useState } from 'react';
import { Button, TextInput, Title, Text } from '@tremor/react';

interface AddRestaurantProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddRestaurant({ isOpen, onClose, onSuccess }: AddRestaurantProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('O nome do restaurante é obrigatório');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          address: address.trim() || undefined,
          city: city.trim() || undefined,
          state: state.trim() || undefined,
          cnpj: cnpj.trim() || undefined,
          active: true,
          plan_type: 'free'
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao criar restaurante');
      }

      // Limpar formulário
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setCity('');
      setState('');
      setCnpj('');
      
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Erro ao criar restaurante:', err);
      setError(err.message || 'Erro ao criar restaurante. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <Title>Adicionar Novo Restaurante</Title>
          <Text className="mt-2">Preencha os dados do novo restaurante</Text>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Restaurante *
              </label>
              <TextInput
                id="name"
                placeholder="Ex: Restaurante Exemplo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <TextInput
                id="email"
                placeholder="contato@restaurante.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <TextInput
                id="phone"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço
              </label>
              <TextInput
                id="address"
                placeholder="Rua das Flores, 123"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <TextInput
                  id="city"
                  placeholder="São Paulo"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <TextInput
                  id="state"
                  placeholder="SP"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-1">
                CNPJ
              </label>
              <TextInput
                id="cnpj"
                placeholder="12.345.678/0001-90"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
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
                Criar Restaurante
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 