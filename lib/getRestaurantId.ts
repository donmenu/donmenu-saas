import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getRestaurantIdFromSession(req: NextApiRequest, res: NextApiResponse): Promise<number> {
  const session = await getServerSession(req, res, authOptions)
  if (!session || !session.user?.id) {
    throw new Error('Não autenticado')
  }
  
  const userId = typeof session.user.id === 'string' ? parseInt(session.user.id, 10) : session.user.id
  
  // Buscar o restaurante do usuário
  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: userId },
    select: { id: true }
  })
  
  if (!restaurant) {
    throw new Error('Restaurante não encontrado para o usuário')
  }
  
  return restaurant.id
} 