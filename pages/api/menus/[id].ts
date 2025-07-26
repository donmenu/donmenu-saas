import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getRestaurantIdFromSession } from '../../../lib/getRestaurantId'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const menuId = parseInt(String(id))

  if (isNaN(menuId)) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  if (req.method === "PUT") {
    try {
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { 
        name, 
        description, 
        type, 
        sort_order, 
        is_promotional, 
        discount_percentage, 
        valid_from, 
        valid_to, 
        image_url,
        active 
      } = req.body

      if (!name) {
        return res.status(400).json({ 
          error: 'Nome do menu é obrigatório' 
        })
      }

      // Validações para cardápios promocionais
      if (is_promotional) {
        if (!discount_percentage || discount_percentage <= 0 || discount_percentage > 100) {
          return res.status(400).json({ 
            error: 'Desconto deve ser entre 0.01% e 100% para cardápios promocionais' 
          })
        }
      }

      const existingMenu = await prisma.menu.findFirst({
        where: {
          id: menuId,
          restaurant_id: restaurantId
        }
      })

      if (!existingMenu) {
        return res.status(404).json({ 
          error: 'Menu não encontrado' 
        })
      }

      const duplicateMenu = await prisma.menu.findFirst({
        where: {
          restaurant_id: restaurantId,
          name: name.trim(),
          id: {
            not: menuId
          }
        }
      })

      if (duplicateMenu) {
        return res.status(400).json({ 
          error: 'Já existe um menu com este nome' 
        })
      }

      const updateData = {
        name: name.trim(),
        description: description?.trim() || null,
        type: type?.trim() || 'principal',
        sort_order: sort_order ? Number(sort_order) : 0,
        is_promotional: is_promotional || false,
        discount_percentage: is_promotional ? Number(discount_percentage) : null,
        valid_from: is_promotional && valid_from ? new Date(valid_from) : null,
        valid_to: is_promotional && valid_to ? new Date(valid_to) : null,
        image_url: image_url?.trim() || null,
        active: active !== undefined ? Boolean(active) : true
      }

      const updatedMenu = await prisma.menu.update({
        where: {
          id: menuId
        },
        data: updateData
      })

      res.status(200).json(updatedMenu)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao atualizar menu:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else if (req.method === "DELETE") {
    try {
      const restaurantId = await getRestaurantIdFromSession(req, res)

      const existingMenu = await prisma.menu.findFirst({
        where: {
          id: menuId,
          restaurant_id: restaurantId
        }
      })

      if (!existingMenu) {
        return res.status(404).json({ 
          error: 'Menu não encontrado' 
        })
      }

      // Verificar se há itens do menu usando este cardápio
      const menuItemsUsingMenu = await prisma.menuItem.findFirst({
        where: {
          menu_id: menuId,
          restaurant_id: restaurantId
        }
      })

      if (menuItemsUsingMenu) {
        return res.status(400).json({ 
          error: 'Não é possível excluir um cardápio que possui itens. Remova os itens primeiro.' 
        })
      }

      await prisma.menu.delete({
        where: {
          id: menuId
        }
      })

      res.status(200).json({ message: 'Menu excluído com sucesso' })
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao excluir menu:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 