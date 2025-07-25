import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getRestaurantIdFromSession } from '../../lib/getRestaurantId'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const categories = await prisma.category.findMany({
        where: {
          restaurant_id: restaurantId,
          active: true
        },
        orderBy: {
          sort_order: 'asc'
        }
      })

      res.status(200).json(categories)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao buscar categorias:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else if (req.method === 'POST') {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { name, description, color, icon, sort_order } = req.body

      // Validações
      if (!name) {
        return res.status(400).json({ 
          error: 'Nome da categoria é obrigatório' 
        })
      }

      // Verificar se já existe uma categoria com o mesmo nome no restaurante
      const existingCategory = await prisma.category.findFirst({
        where: {
          restaurant_id: restaurantId,
          name: name.trim()
        }
      })

      if (existingCategory) {
        return res.status(400).json({ 
          error: 'Já existe uma categoria com este nome' 
        })
      }

      // Criar a categoria
      const category = await prisma.category.create({
        data: {
          name: name.trim(),
          description: description?.trim() || null,
          color: color?.trim() || null,
          icon: icon?.trim() || null,
          sort_order: sort_order ? Number(sort_order) : 0,
          restaurant_id: restaurantId,
          active: true
        }
      })

      res.status(201).json(category)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao criar categoria:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 