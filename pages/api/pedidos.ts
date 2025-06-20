import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { mesa, cliente_nome, itens, total } = req.body

      // Criar o pedido
      const pedido = await prisma.pedidos.create({
        data: {
          mesa,
          cliente_nome,
          total,
          status: 'pendente'
        }
      })

      // Criar os itens do pedido
      for (const item of itens) {
        await prisma.pedido_itens.create({
          data: {
            pedido_id: pedido.pedido_id,
            item_id: item.item_id,
            quantidade: item.quantidade,
            preco_unit: item.preco_unit
          }
        })
      }

      res.status(201).json({ 
        message: 'Pedido criado com sucesso',
        pedido_id: pedido.pedido_id 
      })
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else if (req.method === 'GET') {
    try {
      const pedidos = await prisma.pedidos.findMany({
        include: {
          pedido_itens: {
            include: {
              item: true
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      })

      res.status(200).json(pedidos)
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 