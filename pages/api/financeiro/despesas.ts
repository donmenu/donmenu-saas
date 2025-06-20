import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const despesas = await prisma.expense.findMany({
        include: {
          category: true,
          cash_register: true
        },
        orderBy: {
          expense_date: 'desc'
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
        descricao, 
        valor, 
        data_despesa, 
        forma_pagamento, 
        fornecedor, 
        nota_fiscal, 
        observacoes, 
        categoria_id, 
        caixa_id 
      } = req.body

      const novaDespesa = await prisma.expense.create({
        data: {
          description: descricao,
          amount: valor,
          expense_date: data_despesa ? new Date(data_despesa) : new Date(),
          payment_method: forma_pagamento,
          supplier: fornecedor,
          invoice_number: nota_fiscal,
          notes: observacoes,
          category_id: categoria_id ? parseInt(categoria_id) : null,
          cash_register_id: caixa_id ? parseInt(caixa_id) : null,
          restaurant_id: 1 // TODO: Pegar do contexto de autenticação
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