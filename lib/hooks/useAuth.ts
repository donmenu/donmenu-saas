import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const login = async (provider: 'google' | 'facebook') => {
    try {
      const result = await signIn(provider, {
        callbackUrl: '/dashboard',
        redirect: false,
      })
      
      if (result?.error) {
        throw new Error(result.error)
      }
      
      if (result?.ok) {
        router.push('/dashboard')
      }
      
      return result
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut({ callbackUrl: '/login' })
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    session,
    status,
    login,
    logout,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
  }
}

export function useRequireAuth(redirectTo = '/login') {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push(redirectTo)
    }
  }, [session, status, router, redirectTo])

  return { session, status }
} 