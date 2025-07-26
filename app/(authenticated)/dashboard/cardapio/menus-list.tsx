'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react';
import { 
  ChevronDownIcon, 
  ChevronRightIcon, 
  PlusIcon, 
  Cog6ToothIcon,
  TagIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import ManageMenus from './manage-menus';
import Breadcrumb from './breadcrumb';

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
  items?: MenuItem[];
}

interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  active: boolean;
  visible: boolean;
  category_id?: number;
  category?: {
    id: number;
    name: string;
    color?: string;
  };
}

interface CategoryGroup {
  id: number;
  name: string;
  color?: string;
  items: MenuItem[];
}

export default function MenusList() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedMenus, setExpandedMenus] = useState<Set<number>>(new Set());
  const [isManageMenusOpen, setIsManageMenusOpen] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      setError('');

      // Buscar cardápios
      const menusResponse = await fetch('/api/menus');
      if (!menusResponse.ok) {
        throw new Error('Erro ao buscar cardápios');
      }
      const menusData = await menusResponse.json();

      // Para cada cardápio, buscar seus itens
      const menusWithItems = await Promise.all(
        menusData.map(async (menu: Menu) => {
          const itemsResponse = await fetch(`/api/cardapios?menu_id=${menu.id}`);
          if (itemsResponse.ok) {
            const items = await itemsResponse.json();
            return { ...menu, items };
          }
          return { ...menu, items: [] };
        })
      );

      setMenus(menusWithItems);
    } catch (error: any) {
      console.error('Erro ao buscar cardápios:', error);
      setError('Erro ao carregar cardápios');
    } finally {
      setLoading(false);
    }
  };

  const toggleMenuExpansion = (menuId: number) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const groupItemsByCategory = (items: MenuItem[]): CategoryGroup[] => {
    const groups: { [categoryId: number]: CategoryGroup } = {};

    items.forEach(item => {
      const categoryId = item.category?.id || 0;
      const categoryName = item.category?.name || 'Sem Categoria';
      const categoryColor = item.category?.color;

      if (!groups[categoryId]) {
        groups[categoryId] = {
          id: categoryId,
          name: categoryName,
          color: categoryColor,
          items: []
        };
      }

      groups[categoryId].items.push(item);
    });

    return Object.values(groups).sort((a, b) => a.name.localeCompare(b.name));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getMenuTypeIcon = (type: string) => {
    switch (type) {
      case 'principal':
        return <ShoppingBagIcon className="w-5 h-5" />;
      case 'delivery':
        return <TagIcon className="w-5 h-5" />;
      case 'sobremesas':
        return <SparklesIcon className="w-5 h-5" />;
      case 'bebidas':
        return <TagIcon className="w-5 h-5" />;
      case 'promocional':
        return <TagIcon className="w-5 h-5" />;
      default:
        return <TagIcon className="w-5 h-5" />;
    }
  };

  const getMenuTypeColor = (type: string) => {
    switch (type) {
      case 'principal':
        return 'blue';
      case 'delivery':
        return 'green';
      case 'sobremesas':
        return 'purple';
      case 'bebidas':
        return 'cyan';
      case 'promocional':
        return 'red';
      default:
        return 'gray';
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

  const totalMenus = menus.length;
  const activeMenus = menus.filter(m => m.active).length;
  const promotionalMenus = menus.filter(m => m.is_promotional).length;
  const totalItems = menus.reduce((sum, menu) => sum + (menu.items?.length || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <Text>Carregando cardápios...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <Title className="text-red-600 mb-2">Erro ao carregar</Title>
          <Text className="text-gray-600">{error}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: 'Cardápio', href: '/dashboard/cardapio' },
          { label: 'Lista de Cardápios', href: '/dashboard/cardapio/menus', current: true }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <Title className="text-3xl font-bold text-gray-900 dark:text-white">Lista de Cardápios</Title>
          <Text className="text-gray-600 dark:text-gray-300 mt-2">
            Visualize seus cardápios organizados com seus respectivos produtos
          </Text>
        </div>
        <Button
          onClick={() => setIsManageMenusOpen(true)}
          icon={Cog6ToothIcon}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          Gerenciar Cardápios
        </Button>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-blue-600 dark:text-blue-400 font-medium">Total de Cardápios</Text>
              <Metric className="text-blue-900 dark:text-blue-300">{totalMenus}</Metric>
            </div>
            <Badge color="blue" className="bg-blue-200 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
              <ShoppingBagIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-green-600 dark:text-green-400 font-medium">Cardápios Ativos</Text>
              <Metric className="text-green-900 dark:text-green-300">{activeMenus}</Metric>
            </div>
            <Badge color="green" className="bg-green-200 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              <TagIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-purple-600 dark:text-purple-400 font-medium">Promoções</Text>
              <Metric className="text-purple-900 dark:text-purple-300">{promotionalMenus}</Metric>
            </div>
            <Badge color="purple" className="bg-purple-200 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
              <TagIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-orange-600 dark:text-orange-400 font-medium">Total de Itens</Text>
              <Metric className="text-orange-900 dark:text-orange-300">{totalItems}</Metric>
            </div>
            <Badge color="orange" className="bg-orange-200 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
              <TagIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>
      </div>

      {/* Lista de Cardápios */}
      <div className="space-y-6">
        {menus.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <ShoppingBagIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <Title className="text-gray-500 dark:text-gray-400 mb-2">Nenhum cardápio encontrado</Title>
              <Text className="text-gray-400 dark:text-gray-500 mb-4">
                Comece criando seus primeiros cardápios
              </Text>
              <Button
                onClick={() => setIsManageMenusOpen(true)}
                icon={PlusIcon}
                className="bg-gradient-to-r from-blue-600 to-blue-700"
              >
                Criar Primeiro Cardápio
              </Button>
            </div>
          </Card>
        ) : (
          menus.map((menu) => {
            const isExpanded = expandedMenus.has(menu.id);
            const isPromoValid = isPromotionalValid(menu);
            const categoryGroups = groupItemsByCategory(menu.items || []);

            return (
              <Card key={menu.id} className="overflow-hidden">
                {/* Header do Cardápio */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {menu.image_url ? (
                        <img 
                          src={menu.image_url} 
                          alt={menu.name}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                          {getMenuTypeIcon(menu.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Title className="text-xl font-semibold">{menu.name}</Title>
                        <Badge color={getMenuTypeColor(menu.type) as any}>
                          {menu.type}
                        </Badge>
                        {menu.is_promotional && (
                          <Badge color="red" icon={TagIcon}>
                            {menu.discount_percentage}% OFF
                          </Badge>
                        )}
                        {!menu.active && (
                          <Badge color="gray">Inativo</Badge>
                        )}
                      </div>
                      
                      {menu.description && (
                        <Text className="text-gray-600 dark:text-gray-300">{menu.description}</Text>
                      )}
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <ShoppingBagIcon className="w-4 h-4 mr-1" />
                          {menu.items?.length || 0} produtos
                        </span>
                        <span className="flex items-center">
                          <TagIcon className="w-4 h-4 mr-1" />
                          {categoryGroups.length} categorias
                        </span>
                        {menu.is_promotional && menu.valid_from && menu.valid_to && (
                          <span className={`flex items-center ${!isPromoValid ? 'text-red-500' : 'text-green-500'}`}>
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {new Date(menu.valid_from).toLocaleDateString()} - {new Date(menu.valid_to).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => toggleMenuExpansion(menu.id)}
                    variant="secondary"
                    icon={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    className="ml-4"
                  >
                    {isExpanded ? 'Recolher' : 'Expandir'}
                  </Button>
                </div>

                {/* Conteúdo Expandido */}
                {isExpanded && (
                  <div className="p-6 bg-gray-50 dark:bg-gray-800">
                    {categoryGroups.length === 0 ? (
                      <div className="text-center py-8">
                        <Text className="text-gray-500">Nenhum produto neste cardápio</Text>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {categoryGroups.map((categoryGroup) => (
                          <div key={categoryGroup.id} className="space-y-3">
                            {/* Header da Categoria */}
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: categoryGroup.color || '#6B7280' }}
                              ></div>
                              <Title className="text-lg font-semibold">{categoryGroup.name}</Title>
                              <Badge color="gray" className="ml-2">
                                {categoryGroup.items.length} {categoryGroup.items.length === 1 ? 'produto' : 'produtos'}
                              </Badge>
                            </div>
                            
                            {/* Produtos da Categoria */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {categoryGroup.items.map((item) => (
                                <Card key={item.id} className="p-4">
                                  <div className="flex items-start space-x-3">
                                    <div className="flex-1">
                                      <Title className="text-sm font-medium mb-1">{item.name}</Title>
                                      {item.description && (
                                        <Text className="text-xs text-gray-500 mb-2">{item.description}</Text>
                                      )}
                                      <div className="flex items-center justify-between">
                                        <Text className="text-lg font-bold text-green-600">
                                          {formatCurrency(item.price)}
                                        </Text>
                                        <Badge 
                                          color={item.active ? "green" : "gray"}
                                          size="sm"
                                        >
                                          {item.active ? 'Ativo' : 'Inativo'}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* Modal de Gerenciamento */}
      <ManageMenus
        isOpen={isManageMenusOpen}
        onClose={() => setIsManageMenusOpen(false)}
      />
    </div>
  );
} 