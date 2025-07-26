'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Button, Badge, Metric, Flex } from '@tremor/react';
import { 
  ChevronDownIcon, 
  ChevronRightIcon, 
  EyeIcon,
  TagIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ClockIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import ViewProduct from './view-product';
import Breadcrumb from './breadcrumb';
import type { Cardapio } from '../../../../types/cardapio';

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
}

interface Category {
  id: number;
  name: string;
  color?: string;
}

interface ProductGroup {
  menu: Menu;
  categories: {
    category: Category;
    products: Cardapio[];
  }[];
}

export default function ModernProductsList() {
  const [products, setProducts] = useState<Cardapio[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedMenus, setExpandedMenus] = useState<Set<number>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [viewingProduct, setViewingProduct] = useState<Cardapio | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      // Buscar produtos
      const productsResponse = await fetch('/api/cardapios');
      if (!productsResponse.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const productsData = await productsResponse.json();

      // Buscar menus
      const menusResponse = await fetch('/api/menus');
      if (!menusResponse.ok) {
        throw new Error('Erro ao buscar menus');
      }
      const menusData = await menusResponse.json();

      setProducts(productsData);
      setMenus(menusData);
    } catch (error: any) {
      console.error('Erro ao buscar dados:', error);
      setError('Erro ao carregar dados');
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

  const toggleCategoryExpansion = (menuId: number, categoryId: number) => {
    const key = `${menuId}-${categoryId}`;
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedCategories(newExpanded);
  };

  const groupProductsByMenuAndCategory = (): ProductGroup[] => {
    const groups: { [menuId: number]: ProductGroup } = {};

    products.forEach(product => {
      const menu = menus.find(m => m.id === product.menu_id);
      if (!menu) return;

      if (!groups[menu.id]) {
        groups[menu.id] = {
          menu,
          categories: []
        };
      }

      const categoryName = product.category?.name || 'Sem Categoria';
      const categoryId = product.category?.id || 0;
      
      let categoryGroup = groups[menu.id].categories.find(c => c.category.id === categoryId);
      
      if (!categoryGroup) {
        categoryGroup = {
          category: product.category || { id: 0, name: 'Sem Categoria' },
          products: []
        };
        groups[menu.id].categories.push(categoryGroup);
      }

      categoryGroup.products.push(product);
    });

    return Object.values(groups).map(group => ({
      ...group,
      categories: group.categories.sort((a, b) => a.category.name.localeCompare(b.category.name))
    })).sort((a, b) => a.menu.name.localeCompare(b.menu.name));
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

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.active).length;
  const totalMenus = menus.length;
  const promotionalMenus = menus.filter(m => m.is_promotional).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <Text>Carregando produtos...</Text>
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

  const productGroups = groupProductsByMenuAndCategory();

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: 'Cardápio', href: '/dashboard/cardapio' },
          { label: 'Visualização Moderna', href: '/dashboard/cardapio/modern', current: true }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <Title className="text-3xl font-bold text-gray-900 dark:text-white">Produtos Organizados</Title>
          <Text className="text-gray-600 dark:text-gray-300 mt-2">
            Visualize seus produtos organizados por cardápios e categorias
          </Text>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-blue-600 dark:text-blue-400 font-medium">Total de Produtos</Text>
              <Metric className="text-blue-900 dark:text-blue-300">{totalProducts}</Metric>
            </div>
            <Badge color="blue" className="bg-blue-200 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
              <ShoppingBagIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-green-600 dark:text-green-400 font-medium">Produtos Ativos</Text>
              <Metric className="text-green-900 dark:text-green-300">{activeProducts}</Metric>
            </div>
            <Badge color="green" className="bg-green-200 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              <TagIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-purple-600 dark:text-purple-400 font-medium">Cardápios</Text>
              <Metric className="text-purple-900 dark:text-purple-300">{totalMenus}</Metric>
            </div>
            <Badge color="purple" className="bg-purple-200 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
              <ShoppingBagIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-0 shadow-lg">
          <Flex alignItems="start">
            <div className="truncate">
              <Text className="text-red-600 dark:text-red-400 font-medium">Promoções</Text>
              <Metric className="text-red-900 dark:text-red-300">{promotionalMenus}</Metric>
            </div>
            <Badge color="red" className="bg-red-200 dark:bg-red-900/30 text-red-800 dark:text-red-300">
              <TagIcon className="w-4 h-4" />
            </Badge>
          </Flex>
        </Card>
      </div>

      {/* Lista Organizada */}
      <div className="space-y-6">
        {productGroups.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <ShoppingBagIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <Title className="text-gray-500 dark:text-gray-400 mb-2">Nenhum produto encontrado</Title>
              <Text className="text-gray-400 dark:text-gray-500">
                Comece criando seus primeiros produtos
              </Text>
            </div>
          </Card>
        ) : (
          productGroups.map((group) => {
            const isMenuExpanded = expandedMenus.has(group.menu.id);
            const isPromoValid = isPromotionalValid(group.menu);
            const totalProductsInMenu = group.categories.reduce((sum, cat) => sum + cat.products.length, 0);

            return (
              <Card key={group.menu.id} className="overflow-hidden">
                {/* Header do Cardápio */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {group.menu.image_url ? (
                        <img 
                          src={group.menu.image_url} 
                          alt={group.menu.name}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                          {getMenuTypeIcon(group.menu.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Title className="text-xl font-semibold">{group.menu.name}</Title>
                        <Badge color={getMenuTypeColor(group.menu.type) as any}>
                          {group.menu.type}
                        </Badge>
                        {group.menu.is_promotional && (
                          <Badge color="red" icon={TagIcon}>
                            {group.menu.discount_percentage}% OFF
                          </Badge>
                        )}
                        {!group.menu.active && (
                          <Badge color="gray">Inativo</Badge>
                        )}
                      </div>
                      
                      {group.menu.description && (
                        <Text className="text-gray-600 dark:text-gray-300">{group.menu.description}</Text>
                      )}
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <ShoppingBagIcon className="w-4 h-4 mr-1" />
                          {totalProductsInMenu} produtos
                        </span>
                        <span className="flex items-center">
                          <TagIcon className="w-4 h-4 mr-1" />
                          {group.categories.length} categorias
                        </span>
                        {group.menu.is_promotional && group.menu.valid_from && group.menu.valid_to && (
                          <span className={`flex items-center ${!isPromoValid ? 'text-red-500' : 'text-green-500'}`}>
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {new Date(group.menu.valid_from).toLocaleDateString()} - {new Date(group.menu.valid_to).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => toggleMenuExpansion(group.menu.id)}
                    variant="secondary"
                    icon={isMenuExpanded ? ChevronDownIcon : ChevronRightIcon}
                    className="ml-4"
                  >
                    {isMenuExpanded ? 'Recolher' : 'Expandir'}
                  </Button>
                </div>

                {/* Conteúdo Expandido */}
                {isMenuExpanded && (
                  <div className="p-6 bg-gray-50 dark:bg-gray-800">
                    {group.categories.length === 0 ? (
                      <div className="text-center py-8">
                        <Text className="text-gray-500">Nenhum produto neste cardápio</Text>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {group.categories.map((categoryGroup) => {
                          const categoryKey = `${group.menu.id}-${categoryGroup.category.id}`;
                          const isCategoryExpanded = expandedCategories.has(categoryKey);

                          return (
                            <div key={categoryGroup.category.id} className="space-y-3">
                              {/* Header da Categoria */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div 
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: categoryGroup.category.color || '#6B7280' }}
                                  ></div>
                                  <Title className="text-lg font-semibold">{categoryGroup.category.name}</Title>
                                  <Badge color="gray" className="ml-2">
                                    {categoryGroup.products.length} {categoryGroup.products.length === 1 ? 'produto' : 'produtos'}
                                  </Badge>
                                </div>
                                
                                <Button
                                  onClick={() => toggleCategoryExpansion(group.menu.id, categoryGroup.category.id)}
                                  variant="secondary"
                                  size="xs"
                                  icon={isCategoryExpanded ? ChevronDownIcon : ChevronRightIcon}
                                >
                                  {isCategoryExpanded ? 'Recolher' : 'Expandir'}
                                </Button>
                              </div>
                              
                              {/* Produtos da Categoria */}
                              {isCategoryExpanded && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {categoryGroup.products.map((product) => (
                                    <Card key={product.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setViewingProduct(product)}>
                                      <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                          {product.image_url ? (
                                            <img 
                                              src={product.image_url} 
                                              alt={product.name}
                                              className="w-16 h-16 rounded-lg object-cover"
                                              onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                              }}
                                            />
                                          ) : (
                                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                                              <TagIcon className="w-6 h-6 text-gray-400" />
                                            </div>
                                          )}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                          <Title className="text-sm font-medium mb-1 truncate">{product.name}</Title>
                                          {product.description && (
                                            <Text className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</Text>
                                          )}
                                          <div className="flex items-center justify-between">
                                            <Text className="text-lg font-bold text-green-600">
                                              {formatCurrency(product.price)}
                                            </Text>
                                            <Badge 
                                              color={product.active ? "green" : "gray"}
                                              size="sm"
                                            >
                                              {product.active ? 'Ativo' : 'Inativo'}
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="mt-3 flex justify-end">
                                        <Button
                                          size="xs"
                                          variant="secondary"
                                          icon={EyeIcon}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setViewingProduct(product);
                                          }}
                                          className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                                        >
                                          Ver Detalhes
                                        </Button>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* Modal de Visualização */}
      <ViewProduct
        isOpen={!!viewingProduct}
        onClose={() => setViewingProduct(null)}
        product={viewingProduct}
        onEdit={() => {
          // Implementar edição se necessário
          setViewingProduct(null);
        }}
      />
    </div>
  );
} 