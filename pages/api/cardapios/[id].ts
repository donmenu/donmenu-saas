import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getRestaurantIdFromSession } from '../../../lib/getRestaurantId'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const productId = parseInt(String(id))

  if (isNaN(productId)) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  if (req.method === "PUT") {
    try {
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { 
        name, 
        description, 
        price, 
        image_url, 
        category_id, 
        menu_id, 
        active, 
        visible 
      } = req.body

      if (!name || !price || !menu_id) {
        return res.status(400).json({ 
          error: 'Nome, preço e menu_id são obrigatórios' 
        })
      }

      if (price <= 0) {
        return res.status(400).json({ 
          error: 'O preço deve ser maior que zero' 
        })
      }

      const existingProduct = await prisma.menuItem.findFirst({
        where: {
          id: productId,
          restaurant_id: restaurantId
        }
      })

      if (!existingProduct) {
        return res.status(404).json({ 
          error: 'Produto não encontrado' 
        })
      }

      const duplicateProduct = await prisma.menuItem.findFirst({
        where: {
          restaurant_id: restaurantId,
          menu_id: Number(menu_id),
          name: name.trim(),
          id: {
            not: productId
          }
        }
      })

      if (duplicateProduct) {
        return res.status(400).json({ 
          error: 'Já existe um produto com este nome no cardápio' 
        })
      }

      const updateData = {
        name: name.trim(),
        description: description?.trim() || null,
        price: Number(price),
        image_url: image_url?.trim() || null,
        category_id: category_id ? Number(category_id) : null,
        menu_id: Number(menu_id),
        active: Boolean(active),
        visible: Boolean(visible)
      }

      const updatedProduct = await prisma.menuItem.update({
        where: {
          id: productId
        },
        data: updateData,
        include: {
          category: true,
          menu: true
        }
      })

      res.status(200).json(updatedProduct)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao atualizar produto:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else if (req.method === "DELETE") {
    try {
      const restaurantId = await getRestaurantIdFromSession(req, res)

      const existingProduct = await prisma.menuItem.findFirst({
        where: {
          id: productId,
          restaurant_id: restaurantId
        }
      })

      if (!existingProduct) {
        return res.status(404).json({ 
          error: 'Produto não encontrado' 
        })
      }

      await prisma.menuItem.delete({
        where: {
          id: productId
        }
      })

      res.status(200).json({ message: 'Produto excluído com sucesso' })
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao excluir produto:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 