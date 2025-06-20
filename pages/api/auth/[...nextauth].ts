import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email e Senha',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'seu@email.com' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios')
        }
        
        // Credenciais de teste (remover quando conectar ao banco)
        if (credentials.email === 'admin@restauranteexemplo.com' && credentials.password === 'admin123') {
          return {
            id: '1',
            name: 'Administrador',
            email: 'admin@restauranteexemplo.com',
            image: ''
          }
        }
        
        throw new Error('Email ou senha inválidos')
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.includes('/dashboard')) return url
      return `${baseUrl}/dashboard`
    },
  },
}

export default NextAuth(authOptions)
