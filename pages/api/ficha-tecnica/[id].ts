import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getRestaurantIdFromSession } from '../../../lib/getRestaurantId'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { id } = req.query
  const recipeId = parseInt(String(id))

  if (isNaN(recipeId)) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  try {
    const restaurantId = await getRestaurantIdFromSession(req, res)

    const recipe = await prisma.recipe.findFirst({
      where: {
        id: recipeId,
        restaurant_id: restaurantId
      },
      include: {
        ingredients: {
          include: {
            ingredient: true
          }
        },
        category: true
      }
    })

    if (!recipe) {
      return res.status(404).json({ error: 'Ficha técnica não encontrada' })
    }

    res.status(200).json(recipe)
  } catch (error: any) {
    if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
      res.status(401).json({ error: error.message })
    } else {
      console.error('Erro ao buscar ficha técnica:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
} 