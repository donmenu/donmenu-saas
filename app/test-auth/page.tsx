'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function TestAuthPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Teste de Autenticação</h1>
        
        {session ? (
          <div>
            <p className="mb-4">Logado como: {session.user?.email}</p>
            <p className="mb-4">Nome: {session.user?.name}</p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4">Não logado</p>
            <button
              onClick={() => signIn('google')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Entrar com Google
            </button>
          </div>
        )}
        
        <div className="mt-4 text-sm text-gray-600">
          Status: {status}
        </div>
      </div>
    </div>
  )
} 