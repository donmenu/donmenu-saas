import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { search } = req.query
      const searchTerm = search ? String(search) : ''

      const cardapios = await prisma.menuItem.findMany({
        where: {
          name: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        include: {
          category: true,
          menu: true
        },
        orderBy: {
          id: 'desc'
        }
      })

      res.status(200).json(cardapios)
    } catch (error) {
      console.error('Erro ao buscar cardápios:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else if (req.method === 'POST') {
    try {
      const { name, price, menu_id, restaurant_id, active, description, category_id } = req.body;
      if (!name || price === undefined || !menu_id || !restaurant_id) {
        return res.status(400).json({ error: 'Nome, preço, menu_id e restaurant_id são obrigatórios.' });
      }
      const novoItem = await prisma.menuItem.create({
        data: {
          name,
          price: Number(price),
          menu_id: Number(menu_id),
          restaurant_id: Number(restaurant_id),
          active: active !== undefined ? Boolean(active) : true,
          description: description || undefined,
          category_id: category_id ? Number(category_id) : undefined,
        },
      });
      res.status(201).json(novoItem);
    } catch (error) {
      console.error('Erro ao criar cardápio:', error);
      res.status(500).json({ error: 'Erro ao criar cardápio.' });
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 