'use client';

import { Card, Title, Text, Button } from '@tremor/react';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import DashboardShell from '../DashboardShell';

export default function AssinaturaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <DashboardShell>
      <main className="py-4 md:py-10 mx-auto max-w-7xl">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            
            <Title className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Erro ao carregar assinatura
            </Title>
            
            <Text className="text-gray-600 dark:text-gray-400 mb-6">
              Ocorreu um erro inesperado ao carregar as informações da sua assinatura. 
              Tente novamente ou entre em contato com o suporte se o problema persistir.
            </Text>
            
            <div className="space-y-3">
              <Button
                onClick={reset}
                icon={ArrowPathIcon}
                className="w-full"
              >
                Tentar Novamente
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => window.location.href = '/dashboard'}
                className="w-full"
              >
                Voltar ao Dashboard
              </Button>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="mt-2 text-xs text-red-600 bg-red-50 dark:bg-red-900/10 p-3 rounded overflow-auto">
                  {error.message}
                  {error.digest && `\nDigest: ${error.digest}`}
                </pre>
              </details>
            )}
          </Card>
        </div>
      </main>
    </DashboardShell>
  );
} 