'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

interface ChartProps {
  data?: any[];
}

export default function Chart({ data }: ChartProps) {
  // Se não vier data, usa um array vazio
  const chartData = data || [];
  // Detecta categorias automaticamente se possível
  const categories = chartData.length > 0
    ? Object.keys(chartData[0]).filter(k => k !== 'periodo' && k !== 'Month' && k !== 'period' && k !== 'Semana')
    : ['Sales', 'Profit'];
  // Detecta índice
  const index = chartData.length > 0
    ? (chartData[0].periodo ? 'periodo' : chartData[0].Month ? 'Month' : chartData[0].period ? 'period' : 'Semana')
    : 'Month';
  return (
    <Card className="mt-8">
      <Title>Performance</Title>
      <Text>Comparativo de vendas e lucro</Text>
      <AreaChart
        className="mt-4 h-80"
        data={chartData}
        categories={categories}
        index={index}
        colors={['indigo', 'fuchsia']}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
}
