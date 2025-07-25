import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getRestaurantIdFromSession } from '../../lib/getRestaurantId'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const menus = await prisma.menu.findMany({
        where: {
          restaurant_id: restaurantId,
          active: true
        },
        orderBy: {
          sort_order: 'asc'
        }
      })

      res.status(200).json(menus)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao buscar menus:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else if (req.method === 'POST') {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { name, description, type, sort_order } = req.body

      // Validações
      if (!name) {
        return res.status(400).json({ 
          error: 'Nome do menu é obrigatório' 
        })
      }

      // Verificar se já existe um menu com o mesmo nome no restaurante
      const existingMenu = await prisma.menu.findFirst({
        where: {
          restaurant_id: restaurantId,
          name: name.trim()
        }
      })

      if (existingMenu) {
        return res.status(400).json({ 
          error: 'Já existe um menu com este nome' 
        })
      }

      // Criar o menu
      const menu = await prisma.menu.create({
        data: {
          name: name.trim(),
          description: description?.trim() || null,
          type: type?.trim() || 'principal',
          sort_order: sort_order ? Number(sort_order) : 0,
          restaurant_id: restaurantId,
          active: true
        }
      })

      res.status(201).json(menu)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao criar menu:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 