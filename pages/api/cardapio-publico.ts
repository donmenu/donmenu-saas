import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const itens = await prisma.itens.findMany({
        where: {
          status: true // Apenas itens ativos
        },
        include: {
          category: true
        },
        orderBy: [
          {
            category: {
              name: 'asc'
            }
          },
          {
            name: 'asc'
          }
        ]
      })

      res.status(200).json(itens)
    } catch (error) {
      console.error('Erro ao buscar cardápio público:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 