import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { search } = req.query
      const searchTerm = search ? String(search) : ''

      const ingredients = await prisma.ingredients.findMany({
        where: {
          name: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      })

      res.status(200).json(ingredients)
    } catch (error) {
      console.error('Erro ao buscar ingredientes:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 