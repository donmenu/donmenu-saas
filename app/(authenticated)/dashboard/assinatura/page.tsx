'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Button, Badge, Metric, Flex, Grid } from '@tremor/react';
import { 
  CreditCardIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  StarIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import DashboardShell from '../DashboardShell';
import { useSession } from 'next-auth/react';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
  current?: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    interval: 'month',
    features: [
      '1 restaurante',
      'Até 50 itens no cardápio',
      'Fichas técnicas básicas',
      'Suporte por email',
      'Relatórios básicos'
    ],
    current: true
  },
  {
    id: 'pro',
    name: 'Profissional',
    price: 49,
    interval: 'month',
    features: [
      'Até 5 restaurantes',
      'Itens ilimitados',
      'Fichas técnicas avançadas',
      'Suporte prioritário',
      'Relatórios detalhados',
      'QR Code personalizado',
      'Integração com delivery'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    price: 99,
    interval: 'month',
    features: [
      'Restaurantes ilimitados',
      'Tudo do plano Profissional',
      'API personalizada',
      'Suporte 24/7',
      'Treinamento incluído',
      'Relatórios customizados',
      'Integração com sistemas'
    ]
  }
];

export default function AssinaturaPage() {
  const { data: session } = useSession();
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular busca do plano atual
    setTimeout(() => {
      setCurrentPlan(plans[0]); // Plano gratuito por padrão
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleUpgrade = (planId: string) => {
    // Implementar lógica de upgrade
    console.log('Upgrading to plan:', planId);
  };

  const handleDowngrade = () => {
    // Implementar lógica de downgrade
    console.log('Downgrading plan');
  };

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <Text className="ml-3 text-gray-500">Carregando informações da assinatura...</Text>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <main className="py-4 md:py-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Title className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciar Assinatura</Title>
          <Text className="text-gray-600 dark:text-gray-300 mt-2">
            Escolha o plano ideal para o seu negócio
          </Text>
        </div>

        {/* Plano Atual */}
        {currentPlan && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0">
            <div className="flex items-center justify-between">
              <div>
                <Title className="text-xl font-semibold text-gray-900 dark:text-white">
                  Plano Atual: {currentPlan.name}
                </Title>
                <Text className="text-gray-600 dark:text-gray-300 mt-1">
                  {currentPlan.price === 0 ? 'Gratuito' : `${formatCurrency(currentPlan.price)}/${currentPlan.interval === 'month' ? 'mês' : 'ano'}`}
                </Text>
              </div>
              <Badge color="green" className="bg-green-200 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                Ativo
              </Badge>
            </div>
          </Card>
        )}

        {/* Planos Disponíveis */}
        <div className="mb-8">
          <Title className="text-xl font-semibold mb-6">Planos Disponíveis</Title>
          <Grid numColsSm={1} numColsLg={3} className="gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative border-2 transition-all duration-200 hover:shadow-lg ${
                  plan.popular ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 
                  plan.current ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 
                  'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge color="green" className="bg-green-600 text-white">
                      <StarIcon className="w-3 h-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <Title className="text-xl font-bold">{plan.name}</Title>
                  <div className="mt-2">
                    <Metric className="text-3xl">
                      {plan.price === 0 ? 'Gratuito' : formatCurrency(plan.price)}
                    </Metric>
                    {plan.price > 0 && (
                      <Text className="text-gray-500">
                        por {plan.interval === 'month' ? 'mês' : 'ano'}
                      </Text>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <Text className="text-sm">{feature}</Text>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  {plan.current ? (
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      disabled
                    >
                      <CheckCircleIcon className="w-4 h-4 mr-2" />
                      Plano Atual
                    </Button>
                  ) : plan.price > (currentPlan?.price || 0) ? (
                    <Button 
                      onClick={() => handleUpgrade(plan.id)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <CreditCardIcon className="w-4 h-4 mr-2" />
                      Fazer Upgrade
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary"
                      onClick={handleDowngrade}
                      className="w-full"
                    >
                      <XCircleIcon className="w-4 h-4 mr-2" />
                      Fazer Downgrade
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </Grid>
        </div>

        {/* Informações de Pagamento */}
        <Card className="mb-8">
          <Title className="text-lg font-semibold mb-4">Informações de Pagamento</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Text className="text-gray-500 text-sm mb-2">Método de Pagamento</Text>
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="w-5 h-5 text-gray-400" />
                <Text>Não configurado</Text>
              </div>
            </div>
            <div>
              <Text className="text-gray-500 text-sm mb-2">Próxima Cobrança</Text>
              <Text>Não aplicável (plano gratuito)</Text>
            </div>
          </div>
        </Card>

        {/* Histórico de Faturas */}
        <Card>
          <Title className="text-lg font-semibold mb-4">Histórico de Faturas</Title>
          <div className="text-center py-8">
            <CreditCardIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <Text className="text-gray-500">Nenhuma fatura encontrada</Text>
            <Text className="text-gray-400 text-sm">As faturas aparecerão aqui quando você fizer upgrade</Text>
          </div>
        </Card>
      </main>
    </DashboardShell>
  );
} 