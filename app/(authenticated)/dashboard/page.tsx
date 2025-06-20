'use client'

import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
import Chart from './chart';
import DashboardOnboarding from './dashboard-onboarding'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


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


export default function PlaygroundPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

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

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <DashboardOnboarding />
      <div className="mb-8">
        <Grid className="gap-6" numColsSm={2} numColsLg={3}>
          {categories.map((item) => (
            <Card key={item.title} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <Flex alignItems="start">
                <Text className="text-gray-600 dark:text-gray-300">{item.title}</Text>
              </Flex>
              <Flex
                className="space-x-3 truncate"
                justifyContent="start"
                alignItems="baseline"
              >
                <Metric className="text-gray-900 dark:text-white">{item.metric}</Metric>
                <Text className="truncate text-gray-500 dark:text-gray-400">from {item.metricPrev}</Text>
              </Flex>
            </Card>
          ))}
        </Grid>
      </div>
      <Grid className="mt-8 gap-6" numColsSm={2} numColsLg={3}>
        {data.map((item) => (
          <Card key={item.category} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <Title className="text-gray-900 dark:text-white">{item.category}</Title>
            <Flex
              className="space-x-2"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric className="text-gray-900 dark:text-white">{item.stat}</Metric>
              <Text className="text-gray-500 dark:text-gray-400">Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text className="text-gray-600 dark:text-gray-300">Pages</Text>
              <Text className="text-right text-gray-600 dark:text-gray-300">Views</Text>
            </Flex>
            <BarList
              className="mt-2"
              data={item.data}
              valueFormatter={dataFormatter}
            />
          </Card>
        ))}
      </Grid>
      <Chart />
    </main>
  );
}
