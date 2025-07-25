'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, Title, Text, Button, TextInput } from '@tremor/react';

export default function TestLoginPage() {
  const [email, setEmail] = useState('admin@restauranteexemplo.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard/restaurants');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <Text className="ml-3">Carregando...</Text>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md w-full">
          <Title className="text-center mb-4">✅ Já está logado!</Title>
          <Text className="text-center mb-4">
            Olá, {session.user?.name}! ({session.user?.email})
          </Text>
          <Button 
            onClick={() => router.push('/dashboard/restaurants')}
            className="w-full"
          >
            Ir para Restaurantes
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full">
        <Title className="text-center mb-6">🔐 Teste de Login</Title>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Text className="mb-2">Email</Text>
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@restauranteexemplo.com"
              required
            />
          </div>
          
          <div>
            <Text className="mb-2">Senha</Text>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              required
            />
          </div>
          
          {error && (
            <Text className="text-red-500 text-sm">{error}</Text>
          )}
          
          <Button 
            type="submit" 
            loading={loading}
            className="w-full"
          >
            Fazer Login
          </Button>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <Text className="text-sm text-blue-800">
            <strong>Credenciais de teste:</strong><br/>
            Email: admin@restauranteexemplo.com<br/>
            Senha: admin123
          </Text>
        </div>
      </Card>
    </div>
  );
} 