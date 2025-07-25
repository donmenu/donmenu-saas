'use client';

import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react';
import { PlusIcon, BuildingStorefrontIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRestaurants } from '../../../../lib/hooks/useRestaurants';
import AddRestaurant from './add-restaurant';
import RestaurantDetail from './restaurant-detail';
import Breadcrumb from './breadcrumb';
import { useState } from 'react';
import DashboardShell from '../DashboardShell';

export default function RestaurantsPage() {
  const { restaurants, loading, error, fetchRestaurants } = useRestaurants();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  const handleAddSuccess = () => {
    fetchRestaurants();
  };

  const handleViewRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedRestaurant(null);
  };

  // Calcular métricas
  const totalRestaurants = restaurants.length;
  const activeRestaurants = restaurants.filter(r => r.active).length;

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <Text className="ml-3 text-gray-500">Carregando restaurantes...</Text>
        </div>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <Text className="text-red-600 font-medium">{error}</Text>
        </div>
      </DashboardShell>
    );
  }

  // Se estiver no modo de detalhes, mostrar o componente de detalhes
  if (viewMode === 'detail' && selectedRestaurant) {
    return (
      <DashboardShell>
        <main className="py-4 md:py-10 mx-auto max-w-7xl">
          <Breadcrumb 
            items={[
              { label: 'Restaurantes', href: '/dashboard/restaurants' },
              { label: selectedRestaurant.name }
            ]} 
          />
          <RestaurantDetail restaurant={selectedRestaurant} />
        </main>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <main className="py-4 md:py-10 mx-auto max-w-7xl">
        <Breadcrumb items={[{ label: 'Restaurantes' }]} />
        
        {/* Header com métricas */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <Title className="text-3xl font-bold text-gray-900 dark:text-white">Meus Restaurantes</Title>
              <Text className="text-gray-600 dark:text-gray-300 mt-2">Gerencie seus restaurantes e suas operações</Text>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
              icon={PlusIcon}
            >
              Adicionar Restaurante
            </Button>
          </div>

          {/* Cards de métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0 shadow-lg">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text className="text-green-600 dark:text-green-400 font-medium">Total de Restaurantes</Text>
                  <Metric className="text-green-900 dark:text-green-300">{totalRestaurants}</Metric>
                </div>
                <Badge color="green" className="bg-green-200 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  <BuildingStorefrontIcon className="w-4 h-4" />
                </Badge>
              </Flex>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 shadow-lg">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text className="text-blue-600 dark:text-blue-400 font-medium">Restaurantes Ativos</Text>
                  <Metric className="text-blue-900 dark:text-blue-300">{activeRestaurants}</Metric>
                </div>
                <Badge color="blue" className="bg-blue-200 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  <BuildingStorefrontIcon className="w-4 h-4" />
                </Badge>
              </Flex>
            </Card>
          </div>
        </div>

        {/* Lista de restaurantes */}
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <Title className="text-xl font-semibold text-gray-800 dark:text-white">Lista de Restaurantes</Title>
            <Text className="text-gray-600 dark:text-gray-300 mt-1">Visualize e gerencie todos os seus restaurantes</Text>
          </div>
          
          <div className="p-6">
            {restaurants.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                  <BuildingStorefrontIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <Title className="text-gray-500 dark:text-gray-400 mb-2">Nenhum restaurante encontrado</Title>
                <Text className="text-gray-400 dark:text-gray-500 mb-4">Comece criando seu primeiro restaurante</Text>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  icon={PlusIcon}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Criar Primeiro Restaurante
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="hover:shadow-lg transition-all duration-200 group">
                    <div className="relative">
                      {/* Header do card */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                            <BuildingStorefrontIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <Title className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                              {restaurant.name}
                            </Title>
                            <Text className="text-gray-600 dark:text-gray-400 text-sm">
                              {restaurant.city && restaurant.state ? `${restaurant.city}, ${restaurant.state}` : 'Endereço não informado'}
                            </Text>
                          </div>
                        </div>
                        <Badge color={restaurant.active ? "green" : "red"}>
                          {restaurant.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      
                      {/* Informações do restaurante */}
                      <div className="space-y-3 mb-4">
                        {restaurant.email && (
                          <div className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <Text className="text-gray-600 dark:text-gray-400 truncate">{restaurant.email}</Text>
                          </div>
                        )}
                        {restaurant.phone && (
                          <div className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <Text className="text-gray-600 dark:text-gray-400">{restaurant.phone}</Text>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <Text className="text-gray-600 dark:text-gray-400">Plano: </Text>
                          <Badge color="blue" size="sm">{restaurant.plan_type}</Badge>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <Button
                          onClick={() => handleViewRestaurant(restaurant)}
                          variant="secondary"
                          size="sm"
                          icon={EyeIcon}
                          className="flex-1 mr-2"
                        >
                          Ver Detalhes
                        </Button>
                        <div className="flex space-x-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={PencilIcon}
                            className="p-2"
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={TrashIcon}
                            className="p-2 text-red-500 hover:text-red-700"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card>

        <AddRestaurant
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddSuccess}
        />
      </main>
    </DashboardShell>
  );
}
