import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'

export async function getUserIdFromSession(req: NextApiRequest, res: NextApiResponse): Promise<number> {
  const session = await getServerSession(req, res, authOptions)
  if (!session || !session.user?.id) throw new Error('Não autenticado')
  return typeof session.user.id === 'string' ? parseInt(session.user.id, 10) : session.user.id
} 