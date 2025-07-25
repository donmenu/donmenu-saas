import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const menuItems = await prisma.menuItem.findMany({
        where: {
          active: true,
          visible: true
        },
        include: {
          category: true,
        },
        orderBy: [
          {
            category: {
              sort_order: 'asc',
            },
          },
          {
            sort_order: 'asc',
          },
        ],
      });

      if (!menuItems || menuItems.length === 0) {
        return res.status(404).json({ message: 'Nenhum item encontrado no cardápio.' });
      }

      // Transformar os dados para o formato esperado pelo frontend
      const formattedItems = menuItems.map(item => ({
        item_id: item.id,
        name: item.name,
        description: item.description || '',
        price: Number(item.price),
        category: {
          category_id: item.category?.id || 0,
          name: item.category?.name || 'Sem Categoria'
        }
      }));

      res.status(200).json(formattedItems);
    } catch (error) {
      console.error('Erro ao buscar cardápio público:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao buscar o cardápio.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 