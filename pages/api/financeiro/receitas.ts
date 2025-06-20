import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const receitas = await prisma.receitas.findMany({
        include: {
          categoria: true
        },
        orderBy: {
          data_receita: 'desc'
        }
      })

      res.status(200).json(receitas)
    } catch (error) {
      console.error('Erro ao buscar receitas:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else if (req.method === 'POST') {
    try {
      const { 
        caixa_id, 
        categoria_id, 
        pedido_id, 
        descricao, 
        valor, 
        data_receita, 
        forma_pagamento, 
        observacoes 
      } = req.body

      const novaReceita = await prisma.receitas.create({
        data: {
          caixa_id: caixa_id ? parseInt(caixa_id) : null,
          categoria_id: categoria_id ? parseInt(categoria_id) : null,
          pedido_id: pedido_id ? parseInt(pedido_id) : null,
          descricao,
          valor,
          data_receita: new Date(data_receita),
          forma_pagamento,
          observacoes
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