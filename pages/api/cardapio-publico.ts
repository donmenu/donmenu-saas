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
        include: {
          category: true, // Inclui a categoria de cada item
        },
        orderBy: {
          category: {
            sort_order: 'asc', // Ordena primeiro pela ordem da categoria
          },
        },
      });

      if (!menuItems || menuItems.length === 0) {
        return res.status(404).json({ message: 'Nenhum item encontrado no cardápio.' });
      }

      // Agrupar itens por categoria
      const groupedMenu = menuItems.reduce((acc, item) => {
        const categoryName = item.category?.name || 'Sem Categoria';
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(item);
        return acc;
      }, {} as Record<string, typeof menuItems>);
      

      res.status(200).json(groupedMenu);
    } catch (error) {
      console.error('Erro ao buscar cardápio público:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao buscar o cardápio.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 