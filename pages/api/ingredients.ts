import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { getRestaurantIdFromSession } from "../../lib/getRestaurantId"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { search } = req.query
      const searchTerm = search ? String(search) : ""

      const ingredients = await prisma.ingredient.findMany({
        where: {
          restaurant_id: restaurantId,
          name: {
            contains: searchTerm,
            mode: "insensitive"
          }
        },
        select: {
          id: true,
          name: true,
          unit: true,
          cost_per_unit: true,
          description: true,
          supplier: true,
          current_stock: true,
          min_stock: true,
          image_url: true,
          created_at: true,
          active: true
        },
        orderBy: {
          created_at: "desc"
        }
      })

      // Mapear para o formato esperado pelo frontend
      const mappedIngredients = ingredients.map(ingredient => ({
        ingredient_id: ingredient.id,
        name: ingredient.name,
        unit: ingredient.unit,
        cost_per_unit: ingredient.cost_per_unit,
        description: ingredient.description,
        supplier: ingredient.supplier,
        current_stock: ingredient.current_stock,
        min_stock: ingredient.min_stock,
        image_url: ingredient.image_url,
        created_at: ingredient.created_at,
        active: ingredient.active
      }))

      res.status(200).json(mappedIngredients)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error("Erro ao buscar ingredientes:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
      }
    }
  } else if (req.method === "POST") {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { name, unit, cost_per_unit, description, supplier, min_stock, current_stock, image_url } = req.body

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

      // Verificar se já existe um ingrediente com o mesmo nome no restaurante
      const existingIngredient = await prisma.ingredient.findFirst({
        where: {
          restaurant_id: restaurantId,
          name: name.trim()
        }
      })

      if (existingIngredient) {
        return res.status(400).json({ 
          error: 'Já existe um ingrediente com este nome' 
        })
      }

      // Criar o ingrediente
      const ingredient = await prisma.ingredient.create({
        data: {
          name: name.trim(),
          unit: unit.trim(),
          cost_per_unit: Number(cost_per_unit),
          description: description?.trim() || null,
          supplier: supplier?.trim() || null,
          min_stock: min_stock ? Number(min_stock) : null,
          current_stock: current_stock ? Number(current_stock) : 0,
          image_url: image_url?.trim() || null,
          restaurant_id: restaurantId,
          active: true
        }
      })

      res.status(201).json(ingredient)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error("Erro ao criar ingrediente:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
      }
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
