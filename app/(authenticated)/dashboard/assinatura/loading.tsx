'use client';

import { Card, Title, Text } from '@tremor/react';
import DashboardShell from '../DashboardShell';

export default function AssinaturaLoading() {
  return (
    <DashboardShell>
      <main className="py-4 md:py-10 mx-auto max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
        </div>

        {/* Plano Atual Skeleton */}
        <Card className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
            </div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
          </div>
        </Card>

        {/* Planos Skeleton */}
        <div className="mb-8">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="text-center mb-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto mb-1"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mx-auto"></div>
                </div>
                <div className="space-y-3 mb-6">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </Card>
            ))}
          </div>
        </div>

        {/* Informações de Pagamento Skeleton */}
        <Card className="mb-8">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
            </div>
          </div>
        </Card>

        {/* Histórico Skeleton */}
        <Card>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4 animate-pulse"></div>
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse"></div>
          </div>
        </Card>
      </main>
    </DashboardShell>
  );
} 