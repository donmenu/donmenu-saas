'use client'

import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import Chart from './chart';
import DashboardOnboarding from './dashboard-onboarding'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import supabase from '../../../lib/supabase';
import { useState } from 'react';
import DashboardShell from './DashboardShell';


const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

const data = [
  {
    category: 'Site',
    stat: '10,234',
    data: website
  },
  {
    category: 'Delivery',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Ifood',
    stat: '2,543',
    data: app
  }
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
}[] = [
  {
    title: 'Vendas',
    metric: 'R$ 12,699',
    metricPrev: 'R$ 9,456'
  },
  {
    title: 'Metas',
    metric: 'R$ 40,598',
    metricPrev: 'R$ 45,564'
  },
  {
    title: 'Clientes',
    metric: '1,072',
    metricPrev: '856'
  }
];

function BarraProgresso({ value }: { value: number }) {
  return (
    <div className="w-full mt-2">
      <progress
        className="w-full h-3 rounded bg-gray-200 dark:bg-gray-700 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-green-500 [&::-moz-progress-bar]:bg-green-500"
        value={value}
        max={100}
        style={{ accentColor: '#22c55e' }}
      />
      <style jsx>{`
        progress::-webkit-progress-bar {
          background-color: #e5e7eb;
          border-radius: 6px;
        }
        progress::-webkit-progress-value {
          background-color: #22c55e;
          border-radius: 6px;
        }
        progress::-moz-progress-bar {
          background-color: #22c55e;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}


export default function PlaygroundPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Estados para dados reais
  const [metaFaturamento, setMetaFaturamento] = useState<number | null>(null);
  const [faturamentoMes, setFaturamentoMes] = useState<number | null>(null);
  const [pedidosMes, setPedidosMes] = useState<number | null>(null);
  const [clientesMes, setClientesMes] = useState<number | null>(null);
  const [lucroMes, setLucroMes] = useState<number | null>(null);
  const [cmv, setCmv] = useState<number | null>(null);
  const [caixa, setCaixa] = useState<number | null>(null);
  const [ticketMedio, setTicketMedio] = useState<number | null>(null);
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState<any[]>([]);
  const [tendenciaVendas, setTendenciaVendas] = useState<any[]>([]);

  // Estados para dados do mês anterior
  const [faturamentoMesAnterior, setFaturamentoMesAnterior] = useState<number | null>(null);
  const [pedidosMesAnterior, setPedidosMesAnterior] = useState<number | null>(null);
  const [clientesMesAnterior, setClientesMesAnterior] = useState<number | null>(null);
  const [lucroMesAnterior, setLucroMesAnterior] = useState<number | null>(null);
  const [cmvAnterior, setCmvAnterior] = useState<number | null>(null);
  const [ticketMedioAnterior, setTicketMedioAnterior] = useState<number | null>(null);


  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      // Buscar meta de faturamento do Supabase
      supabase.from('settings').select('*').eq('key', 'meta_faturamento').single().then(({ data }) => {
        if (data && data.value) setMetaFaturamento(Number(data.value));
      });
      // Buscar métricas financeiras
      fetch('/api/financeiro/metricas').then(r => r.json()).then(d => {
        setFaturamentoMes(d.mes?.receitas || 0);
        setLucroMes(d.mes?.lucro || 0);
      });
      // Buscar pedidos
      fetch('/api/pedidos').then(r => r.json()).then(pedidos => {
        if (!Array.isArray(pedidos)) {
          console.error('Erro ao buscar pedidos:', pedidos);
          pedidos = [];
        }
        const now = new Date();
        const mes = now.getMonth();
        const ano = now.getFullYear();
        const pedidosDoMes = pedidos.filter((p: any) => {
          const dt = new Date(p.created_at);
          return dt.getMonth() === mes && dt.getFullYear() === ano;
        });
        setPedidosMes(pedidosDoMes.length);
        // Clientes únicos
        const clientes = new Set(pedidosDoMes.map((p: any) => p.customer_name || 'Desconhecido'));
        setClientesMes(clientes.size);
        // Ticket médio
        const total = pedidosDoMes.reduce((sum: number, p: any) => sum + Number(p.total), 0);
        setTicketMedio(pedidosDoMes.length > 0 ? total / pedidosDoMes.length : 0);
      });
      // Buscar CMV e produtos mais vendidos
      fetch('/api/cmv').then(r => r.json()).then(d => {
        setCmv(d.cmvGeral || 0);
        setProdutosMaisVendidos((d.produtos || []).sort((a: any, b: any) => b.vendas - a.vendas).slice(0, 5));
      });
      // Buscar saldo de caixa
      fetch('/api/financeiro/caixa').then(r => r.json()).then(d => {
        setCaixa(d.caixaAtual?.saldo || 0);
      });
      // Buscar tendência de vendas
      fetch('/api/financeiro/relatorios').then(r => r.json()).then(d => {
        setTendenciaVendas(d.relatorioData || []);
      });

      // Buscar métricas do mês anterior
      fetch('/api/financeiro/metricas').then(r => r.json()).then(d => {
        // Mês anterior
        const now = new Date();
        const mesAnterior = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const mesAnteriorNum = mesAnterior.getMonth();
        const anoAnterior = mesAnterior.getFullYear();
        // Faturamento e lucro do mês anterior
        // (Simples: usar receitas/despesas filtrando por data)
        // Aqui, para simplificação, usaremos o mesmo endpoint e simularemos a busca do mês anterior
        // Em produção, idealmente criar endpoint específico ou passar parâmetro de período
        // Faturamento e lucro do mês anterior
        setFaturamentoMesAnterior(d.mes?.receitas || 0); // Simulação
        setLucroMesAnterior(d.mes?.lucro || 0); // Simulação
      });
      fetch('/api/pedidos').then(r => r.json()).then(pedidos => {
        if (!Array.isArray(pedidos)) {
          console.error('Erro ao buscar pedidos:', pedidos);
          pedidos = [];
        }
        const now = new Date();
        const mesAnterior = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const mesAnteriorNum = mesAnterior.getMonth();
        const anoAnterior = mesAnterior.getFullYear();
        const pedidosDoMesAnterior = pedidos.filter((p: any) => {
          const dt = new Date(p.created_at);
          return dt.getMonth() === mesAnteriorNum && dt.getFullYear() === anoAnterior;
        });
        setPedidosMesAnterior(pedidosDoMesAnterior.length);
        // Clientes únicos mês anterior
        const clientes = new Set(pedidosDoMesAnterior.map((p: any) => p.customer_name || 'Desconhecido'));
        setClientesMesAnterior(clientes.size);
        // Ticket médio mês anterior
        const total = pedidosDoMesAnterior.reduce((sum: number, p: any) => sum + Number(p.total), 0);
        setTicketMedioAnterior(pedidosDoMesAnterior.length > 0 ? total / pedidosDoMesAnterior.length : 0);
      });
      fetch('/api/cmv').then(r => r.json()).then(d => {
        setCmvAnterior(d.cmvGeral || 0); // Simulação
      });
    }
  }, [status]);

  function getTrendIcon(current: number | null, previous: number | null) {
    if (current === null || previous === null) return null;
    if (current > previous) return <ArrowUpIcon className="w-4 h-4 text-green-500 inline" />;
    if (current < previous) return <ArrowDownIcon className="w-4 h-4 text-red-500 inline" />;
    return null;
  }
  function getTrendPercent(current: number | null, previous: number | null) {
    if (current === null || previous === null || previous === 0) return null;
    const diff = ((current - previous) / previous) * 100;
    return diff.toFixed(1) + '%';
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Cards principais
  const cards = [
    {
      title: 'Faturamento do Mês',
      value: faturamentoMes !== null ? `R$ ${faturamentoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '...',
      icon: getTrendIcon(faturamentoMes, faturamentoMesAnterior),
      percent: getTrendPercent(faturamentoMes, faturamentoMesAnterior)
    },
    {
      title: 'Pedidos Realizados',
      value: pedidosMes !== null ? pedidosMes : '...',
      icon: getTrendIcon(pedidosMes, pedidosMesAnterior),
      percent: getTrendPercent(pedidosMes, pedidosMesAnterior)
    },
    {
      title: 'Clientes Atendidos',
      value: clientesMes !== null ? clientesMes : '...',
      icon: getTrendIcon(clientesMes, clientesMesAnterior),
      percent: getTrendPercent(clientesMes, clientesMesAnterior)
    },
    {
      title: 'Meta de Faturamento',
      value: metaFaturamento !== null ? `R$ ${metaFaturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '...'
    },
    {
      title: 'Progresso da Meta',
      value: metaFaturamento && faturamentoMes ? `${((faturamentoMes / metaFaturamento) * 100).toFixed(1)}%` : '...'
    },
    {
      title: 'Lucro Bruto',
      value: lucroMes !== null ? `R$ ${lucroMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '...',
      icon: getTrendIcon(lucroMes, lucroMesAnterior),
      percent: getTrendPercent(lucroMes, lucroMesAnterior)
    },
    {
      title: 'CMV (%)',
      value: cmv !== null ? `${cmv.toFixed(1)}%` : '...',
      icon: getTrendIcon(cmvAnterior, cmv), // CMV: quanto menor, melhor
      percent: getTrendPercent(cmvAnterior, cmv)
    },
    {
      title: 'Saldo em Caixa',
      value: caixa !== null ? `R$ ${caixa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '...'
    },
    {
      title: 'Ticket Médio',
      value: ticketMedio !== null ? `R$ ${ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '...',
      icon: getTrendIcon(ticketMedio, ticketMedioAnterior),
      percent: getTrendPercent(ticketMedio, ticketMedioAnterior)
    }
  ];

  return (
    <DashboardShell>
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <DashboardOnboarding />
        <div className="mb-8">
          <Grid className="gap-6" numColsSm={2} numColsLg={3}>
            {cards.map((item) => (
              <Card key={item.title} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <Flex alignItems="start">
                  <Text className="text-gray-600 dark:text-gray-300">{item.title}</Text>
                </Flex>
                <Flex className="space-x-3 truncate" justifyContent="start" alignItems="baseline">
                  <Metric className="text-gray-900 dark:text-white">{item.value} {item.icon} {item.percent && <span className="text-xs ml-1">{item.percent}</span>}</Metric>
                </Flex>
                {item.title === 'Progresso da Meta' && metaFaturamento && faturamentoMes !== null && (
                  <BarraProgresso value={Math.min((faturamentoMes / metaFaturamento) * 100, 100)} />
                )}
              </Card>
            ))}
          </Grid>
        </div>
        {/* Produtos mais vendidos */}
        <div className="mb-8">
          <Title className="text-gray-900 dark:text-white mb-2">Produtos Mais Vendidos</Title>
          <Grid className="gap-6" numColsSm={2} numColsLg={5}>
            {produtosMaisVendidos.map((prod) => (
              <Card key={prod.nome} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <Text className="text-gray-600 dark:text-gray-300">{prod.nome}</Text>
                <Metric className="text-gray-900 dark:text-white">{prod.vendas}</Metric>
              </Card>
            ))}
          </Grid>
        </div>
        {/* Tendência de vendas */}
        <div className="mb-8">
          <Title className="text-gray-900 dark:text-white mb-2">Tendência de Vendas</Title>
          <Grid className="gap-6" numColsSm={1} numColsLg={1}>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <Chart data={tendenciaVendas} />
            </Card>
          </Grid>
        </div>
      </main>
    </DashboardShell>
  );
}
