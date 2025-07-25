'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Badge, Metric, Flex, Grid, Button } from '@tremor/react';
import { 
  BuildingStorefrontIcon, 
  Bars3Icon, 
  CubeIcon, 
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import StatsCard from './stats-card';

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

interface RestaurantStats {
  menus: number;
  menuItems: number;
  ingredients: number;
  recipes: number;
  orders: number;
  revenue: number;
}

interface RestaurantDetailProps {
  restaurant: Restaurant;
}

export default function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  const [stats, setStats] = useState<RestaurantStats>({
    menus: 0,
    menuItems: 0,
    ingredients: 0,
    recipes: 0,
    orders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar estatísticas do restaurante
    const fetchStats = async () => {
      try {
        const [menusRes, menuItemsRes, ingredientsRes, recipesRes, ordersRes, revenueRes] = await Promise.all([
          fetch(`/api/restaurants/${restaurant.id}/menus`),
          fetch(`/api/restaurants/${restaurant.id}/menu-items`),
          fetch(`/api/restaurants/${restaurant.id}/ingredients`),
          fetch(`/api/restaurants/${restaurant.id}/recipes`),
          fetch(`/api/restaurants/${restaurant.id}/orders`),
          fetch(`/api/restaurants/${restaurant.id}/revenue`)
        ]);

        const [menus, menuItems, ingredients, recipes, orders, revenue] = await Promise.all([
          menusRes.json().catch(() => ({ count: 0 })),
          menuItemsRes.json().catch(() => ({ count: 0 })),
          ingredientsRes.json().catch(() => ({ count: 0 })),
          recipesRes.json().catch(() => ({ count: 0 })),
          ordersRes.json().catch(() => ({ count: 0 })),
          revenueRes.json().catch(() => ({ total: 0 }))
        ]);

        setStats({
          menus: menus.count || 0,
          menuItems: menuItems.count || 0,
          ingredients: ingredients.count || 0,
          recipes: recipes.count || 0,
          orders: orders.count || 0,
          revenue: revenue.total || 0
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [restaurant.id]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <Text className="ml-3 text-gray-500">Carregando estatísticas...</Text>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header do Restaurante */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
              <BuildingStorefrontIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <Title className="text-2xl font-bold text-gray-900 dark:text-white">
                {restaurant.name}
              </Title>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                {restaurant.city && restaurant.state && (
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{restaurant.city}, {restaurant.state}</span>
                  </div>
                )}
                {restaurant.phone && (
                  <div className="flex items-center space-x-1">
                    <PhoneIcon className="w-4 h-4" />
                    <span>{restaurant.phone}</span>
                  </div>
                )}
                {restaurant.email && (
                  <div className="flex items-center space-x-1">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>{restaurant.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge color={restaurant.active ? "green" : "red"} className="mb-2">
              {restaurant.active ? "Ativo" : "Inativo"}
            </Badge>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div>Plano: <Badge color="blue">{restaurant.plan_type}</Badge></div>
              <div>Criado em: {formatDate(restaurant.created_at)}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Métricas do Restaurante */}
      <Grid numColsSm={2} numColsLg={3} className="gap-6">
        <StatsCard
          title="Cardápios"
          value={stats.menus}
          icon={Bars3Icon}
          color="blue"
          subtitle="Menus ativos"
        />

        <StatsCard
          title="Itens do Cardápio"
          value={stats.menuItems}
          icon={Bars3Icon}
          color="green"
          subtitle="Produtos cadastrados"
        />

        <StatsCard
          title="Insumos"
          value={stats.ingredients}
          icon={CubeIcon}
          color="orange"
          subtitle="Ingredientes disponíveis"
        />

        <StatsCard
          title="Fichas Técnicas"
          value={stats.recipes}
          icon={ClipboardDocumentListIcon}
          color="purple"
          subtitle="Receitas cadastradas"
        />

        <StatsCard
          title="Pedidos"
          value={stats.orders}
          icon={ShoppingCartIcon}
          color="indigo"
          subtitle="Total de pedidos"
        />

        <StatsCard
          title="Receita Total"
          value={stats.revenue}
          icon={CurrencyDollarIcon}
          color="emerald"
          subtitle="Faturamento geral"
          formatValue={(value) => formatCurrency(value)}
        />
      </Grid>

      {/* Ações Rápidas */}
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
        <Title className="text-lg font-semibold mb-4">Ações Rápidas</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href={`/dashboard/restaurants/${restaurant.id}/menus`}>
            <Button 
              variant="secondary" 
              className="w-full justify-start"
              icon={Bars3Icon}
            >
              Gerenciar Cardápios
            </Button>
          </Link>
          
          <Link href={`/dashboard/restaurants/${restaurant.id}/ingredients`}>
            <Button 
              variant="secondary" 
              className="w-full justify-start"
              icon={CubeIcon}
            >
              Gerenciar Insumos
            </Button>
          </Link>
          
          <Link href={`/dashboard/restaurants/${restaurant.id}/recipes`}>
            <Button 
              variant="secondary" 
              className="w-full justify-start"
              icon={ClipboardDocumentListIcon}
            >
              Fichas Técnicas
            </Button>
          </Link>
          
          <Link href={`/dashboard/restaurants/${restaurant.id}/orders`}>
            <Button 
              variant="secondary" 
              className="w-full justify-start"
              icon={ShoppingCartIcon}
            >
              Ver Pedidos
            </Button>
          </Link>
        </div>
      </Card>

      {/* Informações Adicionais */}
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
        <Title className="text-lg font-semibold mb-4">Informações do Restaurante</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <Text className="text-gray-500 text-sm">CNPJ</Text>
              <Text className="font-medium">{restaurant.cnpj || 'Não informado'}</Text>
            </div>
            <div>
              <Text className="text-gray-500 text-sm">Endereço</Text>
              <Text className="font-medium">{restaurant.address || 'Não informado'}</Text>
            </div>
            <div>
              <Text className="text-gray-500 text-sm">Cidade/Estado</Text>
              <Text className="font-medium">
                {restaurant.city && restaurant.state 
                  ? `${restaurant.city}, ${restaurant.state}` 
                  : 'Não informado'
                }
              </Text>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <Text className="text-gray-500 text-sm">Email</Text>
              <Text className="font-medium">{restaurant.email || 'Não informado'}</Text>
            </div>
            <div>
              <Text className="text-gray-500 text-sm">Telefone</Text>
              <Text className="font-medium">{restaurant.phone || 'Não informado'}</Text>
            </div>
            <div>
              <Text className="text-gray-500 text-sm">Última Atualização</Text>
              <Text className="font-medium">{formatDate(restaurant.updated_at)}</Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 