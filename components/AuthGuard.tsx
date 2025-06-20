'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
}

export default function AuthGuard({ 
  children, 
  fallback,
  redirectTo = '/login' 
}: AuthGuardProps): JSX.Element | null {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push(redirectTo)
    }
  }, [session, status, router, redirectTo])

  // Mostrar loading enquanto verifica autenticação
  if (status === 'loading') {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Se não há sessão, não renderizar nada (será redirecionado)
  if (!session) {
    return null
  }

  return <>{children}</>
} 