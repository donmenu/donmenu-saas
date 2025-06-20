import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const despesas = await prisma.despesas.findMany({
        include: {
          categoria: true
        },
        orderBy: {
          data_despesa: 'desc'
        }
      })

      res.status(200).json(despesas)
    } catch (error) {
      console.error('Erro ao buscar despesas:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else if (req.method === 'POST') {
    try {
      const { 
        caixa_id, 
        categoria_id, 
        descricao, 
        valor, 
        data_despesa, 
        forma_pagamento, 
        fornecedor, 
        nota_fiscal, 
        observacoes 
      } = req.body

      const novaDespesa = await prisma.despesas.create({
        data: {
          caixa_id: caixa_id ? parseInt(caixa_id) : null,
          categoria_id: categoria_id ? parseInt(categoria_id) : null,
          descricao,
          valor,
          data_despesa: new Date(data_despesa),
          forma_pagamento,
          fornecedor,
          nota_fiscal,
          observacoes
        }
      })

      res.status(201).json(novaDespesa)
    } catch (error) {
      console.error('Erro ao criar despesa:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 