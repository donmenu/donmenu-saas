import { useState, useEffect, useCallback } from 'react';

interface Restaurant {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  cnpj?: string;
  active: boolean;
  plan_type: string;
  created_at: string;
  updated_at: string;
}

interface CreateRestaurantData {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  cnpj?: string;
  active?: boolean;
  plan_type?: string;
}

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/restaurants');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao buscar restaurantes');
      }
      
      const data = await response.json();
      setRestaurants(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar restaurantes');
    } finally {
      setLoading(false);
    }
  }, []);

  const createRestaurant = useCallback(async (restaurantData: CreateRestaurantData): Promise<Restaurant> => {
    try {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurantData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar restaurante');
      }

      const newRestaurant = await response.json();
      
      // Atualizar a lista local
      setRestaurants(prev => [newRestaurant, ...prev]);
      
      return newRestaurant;
    } catch (err: any) {
      throw new Error(err.message || 'Erro ao criar restaurante');
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return {
    restaurants,
    loading,
    error,
    fetchRestaurants,
    createRestaurant
  };
}

// Hook específico para criar restaurante
export function useCreateRestaurant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRestaurant = useCallback(async (restaurantData: CreateRestaurantData): Promise<Restaurant | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurantData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar restaurante');
      }

      const newRestaurant = await response.json();
      return newRestaurant;
    } catch (err: any) {
      setError(err.message || 'Erro ao criar restaurante');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createRestaurant,
    loading,
    error
  };
} 