import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getRestaurantIdFromSession } from '../../../lib/getRestaurantId'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const categoryId = parseInt(String(id))

  if (isNaN(categoryId)) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  if (req.method === "PUT") {
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

      // Verificar se a categoria existe e pertence ao restaurante
      const existingCategory = await prisma.category.findFirst({
        where: {
          id: categoryId,
          restaurant_id: restaurantId
        }
      })

      if (!existingCategory) {
        return res.status(404).json({ 
          error: 'Categoria não encontrada' 
        })
      }

      // Verificar se já existe outra categoria com o mesmo nome no restaurante
      const duplicateCategory = await prisma.category.findFirst({
        where: {
          restaurant_id: restaurantId,
          name: name.trim(),
          id: {
            not: categoryId
          }
        }
      })

      if (duplicateCategory) {
        return res.status(400).json({ 
          error: 'Já existe uma categoria com este nome' 
        })
      }

      // Atualizar a categoria
      const updatedCategory = await prisma.category.update({
        where: {
          id: categoryId
        },
        data: {
          name: name.trim(),
          description: description?.trim() || null,
          color: color?.trim() || null,
          icon: icon?.trim() || null,
          sort_order: sort_order ? Number(sort_order) : 0
        }
      })

      res.status(200).json(updatedCategory)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao atualizar categoria:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else if (req.method === "DELETE") {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)

      // Verificar se a categoria existe e pertence ao restaurante
      const existingCategory = await prisma.category.findFirst({
        where: {
          id: categoryId,
          restaurant_id: restaurantId
        }
      })

      if (!existingCategory) {
        return res.status(404).json({ 
          error: 'Categoria não encontrada' 
        })
      }

      // Verificar se há receitas usando esta categoria
      const recipesUsingCategory = await prisma.recipe.findFirst({
        where: {
          category_id: categoryId,
          restaurant_id: restaurantId
        }
      })

      if (recipesUsingCategory) {
        return res.status(400).json({ 
          error: 'Não é possível excluir uma categoria que está sendo usada por fichas técnicas' 
        })
      }

      // Verificar se há itens do menu usando esta categoria
      const menuItemsUsingCategory = await prisma.menuItem.findFirst({
        where: {
          category_id: categoryId,
          restaurant_id: restaurantId
        }
      })

      if (menuItemsUsingCategory) {
        return res.status(400).json({ 
          error: 'Não é possível excluir uma categoria que está sendo usada por itens do menu' 
        })
      }

      // Excluir a categoria
      await prisma.category.delete({
        where: {
          id: categoryId
        }
      })

      res.status(200).json({ message: 'Categoria excluída com sucesso' })
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao excluir categoria:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 