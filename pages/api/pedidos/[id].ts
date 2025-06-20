import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const pedidoId = parseInt(id as string)

  if (req.method === 'PATCH') {
    try {
      const { status } = req.body

      const pedido = await prisma.pedidos.update({
        where: {
          pedido_id: pedidoId
        },
        data: {
          status
        }
      })

      res.status(200).json(pedido)
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else {
    res.setHeader('Allow', ['PATCH'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 