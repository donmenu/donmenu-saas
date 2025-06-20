import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { tipo } = req.query

      const where = tipo ? { type: tipo as string } : {}

      const categorias = await prisma.financialCategory.findMany({
        where: {
          ...where,
          restaurant_id: 1 // TODO: Pegar do contexto de autenticação
        },
        orderBy: {
          name: 'asc'
        }
      })

      res.status(200).json(categorias)
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else if (req.method === 'POST') {
    try {
      const { nome, tipo, descricao, cor } = req.body

      const novaCategoria = await prisma.financialCategory.create({
        data: {
          name: nome,
          type: tipo,
          description: descricao,
          color: cor,
          restaurant_id: 1 // TODO: Pegar do contexto de autenticação
        }
      })

      res.status(201).json(novaCategoria)
    } catch (error) {
      console.error('Erro ao criar categoria:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 