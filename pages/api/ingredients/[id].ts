import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { getRestaurantIdFromSession } from "../../../lib/getRestaurantId"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const ingredientId = parseInt(String(id))

  if (isNaN(ingredientId)) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  if (req.method === "PUT") {
    try {
      console.log('Iniciando atualização do ingrediente:', ingredientId)
      
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      console.log('Restaurant ID:', restaurantId)
      
      const { name, unit, cost_per_unit, description, supplier, min_stock, current_stock, image_url } = req.body
      console.log('Dados recebidos:', { name, unit, cost_per_unit, description, supplier, min_stock, current_stock, image_url })

      // Validações
      if (!name || !unit || cost_per_unit === undefined) {
        return res.status(400).json({ 
          error: 'Nome, unidade e custo por unidade são obrigatórios' 
        })
      }

      if (cost_per_unit <= 0) {
        return res.status(400).json({ 
          error: 'O custo por unidade deve ser maior que zero' 
        })
      }

      // Verificar se o ingrediente existe e pertence ao restaurante
      const existingIngredient = await prisma.ingredient.findFirst({
        where: {
          id: ingredientId,
          restaurant_id: restaurantId
        }
      })

      if (!existingIngredient) {
        return res.status(404).json({ 
          error: 'Ingrediente não encontrado' 
        })
      }

      console.log('Ingrediente encontrado:', existingIngredient)

      // Verificar se já existe outro ingrediente com o mesmo nome no restaurante
      const duplicateIngredient = await prisma.ingredient.findFirst({
        where: {
          restaurant_id: restaurantId,
          name: name.trim(),
          id: {
            not: ingredientId
          }
        }
      })

      if (duplicateIngredient) {
        return res.status(400).json({ 
          error: 'Já existe um ingrediente com este nome' 
        })
      }

      // Preparar dados para atualização
      const updateData = {
        name: name.trim(),
        unit: unit.trim(),
        cost_per_unit: Number(cost_per_unit),
        description: description?.trim() || null,
        supplier: supplier?.trim() || null,
        min_stock: min_stock ? Number(min_stock) : null,
        current_stock: current_stock ? Number(current_stock) : 0,
        image_url: image_url?.trim() || null
      }

      console.log('Dados para atualização:', updateData)

      // Atualizar o ingrediente
      const updatedIngredient = await prisma.ingredient.update({
        where: {
          id: ingredientId
        },
        data: updateData
      })

      console.log('Ingrediente atualizado com sucesso:', updatedIngredient)

      res.status(200).json(updatedIngredient)
    } catch (error: any) {
      console.error("Erro detalhado ao atualizar ingrediente:", error)
      
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error("Erro ao atualizar ingrediente:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
      }
    }
  } else if (req.method === "DELETE") {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)

      // Verificar se o ingrediente existe e pertence ao restaurante
      const existingIngredient = await prisma.ingredient.findFirst({
        where: {
          id: ingredientId,
          restaurant_id: restaurantId
        }
      })

      if (!existingIngredient) {
        return res.status(404).json({ 
          error: 'Ingrediente não encontrado' 
        })
      }

      // Excluir o ingrediente
      await prisma.ingredient.delete({
        where: {
          id: ingredientId
        }
      })

      res.status(200).json({ message: 'Ingrediente excluído com sucesso' })
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error("Erro ao excluir ingrediente:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
      }
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 