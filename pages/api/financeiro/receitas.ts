import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getRestaurantIdFromSession } from '../../../lib/getRestaurantId'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const receitas = await prisma.revenue.findMany({
        where: {
          restaurant_id: restaurantId
        },
        include: {
          category: true,
          cash_register: true,
          order: true
        },
        orderBy: {
          revenue_date: 'desc'
        }
      })

      res.status(200).json(receitas)
    } catch (error) {
      console.error('Erro ao buscar receitas:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else if (req.method === 'POST') {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { 
        descricao, 
        valor, 
        data_receita, 
        forma_pagamento, 
        observacoes, 
        categoria_id, 
        caixa_id,
        pedido_id 
      } = req.body

      const novaReceita = await prisma.revenue.create({
        data: {
          description: descricao,
          amount: valor,
          revenue_date: data_receita ? new Date(data_receita) : new Date(),
          payment_method: forma_pagamento,
          notes: observacoes,
          category_id: categoria_id ? parseInt(categoria_id) : null,
          cash_register_id: caixa_id ? parseInt(caixa_id) : null,
          order_id: pedido_id ? parseInt(pedido_id) : null,
          restaurant_id: restaurantId
        }
      })

      res.status(201).json(novaReceita)
    } catch (error) {
      console.error('Erro ao criar receita:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 