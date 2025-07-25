import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image: string
      phone?: string
      address?: string
      bio?: string
    }
    accessToken: string
  }

  interface User {
    id: string
    name: string
    email: string
    image: string
    phone?: string
    address?: string
    bio?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    accessToken: string
  }
} 