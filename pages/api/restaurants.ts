import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'
import { getUserIdFromSession } from '../../lib/getUserId'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const userId = await getUserIdFromSession(req, res)
      const restaurantes = await prisma.restaurant.findMany({
        where: { userId },
        orderBy: { created_at: 'desc' }
      })
      res.status(200).json(restaurantes)
    } catch (error: any) {
      res.status(401).json({ error: 'Não autenticado' })
    }
  } else if (req.method === 'POST') {
    try {
      const userId = await getUserIdFromSession(req, res)
      const { name, ...outrosCampos } = req.body
      const restaurante = await prisma.restaurant.create({
        data: {
          name,
          ...outrosCampos,
          userId
        }
      })
      res.status(201).json(restaurante)
    } catch (error: any) {
      if (error.message === 'Não autenticado') {
        res.status(401).json({ error: 'Não autenticado' })
      } else {
        res.status(500).json({ error: 'Erro ao criar restaurante' })
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 