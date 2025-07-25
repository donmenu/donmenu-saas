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

      const fichasTecnicas = await prisma.recipe.findMany({
        where: {
          restaurant_id: restaurantId,
          name: {
            contains: searchTerm,
            mode: "insensitive"
          }
        },
        include: {
          category: true,
          ingredients: {
            include: {
              ingredient: true
            }
          }
        },
        orderBy: {
          created_at: "desc"
        }
      })

      res.status(200).json(fichasTecnicas)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error("Erro ao buscar fichas técnicas:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
      }
    }
  } else if (req.method === "POST") {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { 
        name, 
        description, 
        category_id, 
        yield_quantity, 
        yield_unit, 
        preparation_time, 
        difficulty, 
        instructions, 
        ingredients 
      } = req.body

      // Validações
      if (!name || !yield_quantity || !yield_unit || !ingredients || ingredients.length === 0) {
        return res.status(400).json({ 
          error: 'Nome, quantidade de produção, unidade e ingredientes são obrigatórios' 
        })
      }

      if (yield_quantity <= 0) {
        return res.status(400).json({ 
          error: 'A quantidade de produção deve ser maior que zero' 
        })
      }

      // Verificar se já existe uma receita com o mesmo nome no restaurante
      const existingRecipe = await prisma.recipe.findFirst({
        where: {
          restaurant_id: restaurantId,
          name: name.trim()
        }
      })

      if (existingRecipe) {
        return res.status(400).json({ 
          error: 'Já existe uma receita com este nome' 
        })
      }

      // Calcular custo total dos ingredientes
      let totalCost = 0
      const recipeIngredients = []

      for (const ingredientData of ingredients) {
        const { ingredient_id, quantity, unit } = ingredientData

        // Buscar o ingrediente para obter o custo
        const ingredient = await prisma.ingredient.findFirst({
          where: {
            id: ingredient_id,
            restaurant_id: restaurantId
          }
        })

        if (!ingredient) {
          return res.status(400).json({ 
            error: `Ingrediente com ID ${ingredient_id} não encontrado` 
          })
        }

        // Calcular custo do ingrediente
        const ingredientCost = Number(ingredient.cost_per_unit) * Number(quantity)
        totalCost += ingredientCost

        recipeIngredients.push({
          restaurant_id: restaurantId,
          ingredient_id: ingredient_id,
          quantity: Number(quantity),
          unit: unit,
          cost: ingredientCost
        })
      }

      // Calcular custo por porção
      const costPerYield = totalCost / Number(yield_quantity)

      // Criar a receita
      const recipe = await prisma.recipe.create({
        data: {
          name: name.trim(),
          description: description?.trim() || null,
          category_id: category_id ? Number(category_id) : null,
          yield_quantity: Number(yield_quantity),
          yield_unit: yield_unit.trim(),
          preparation_time: preparation_time ? Number(preparation_time) : null,
          difficulty: difficulty?.trim() || null,
          instructions: instructions?.trim() || null,
          total_cost: totalCost,
          cost_per_yield: costPerYield,
          restaurant_id: restaurantId,
          active: true
        }
      })

      // Criar os ingredientes da receita
      for (const ingredientData of recipeIngredients) {
        await prisma.recipeIngredient.create({
          data: {
            ...ingredientData,
            recipe_id: recipe.id
          }
        })
      }

      // Buscar a receita criada com ingredientes
      const createdRecipe = await prisma.recipe.findUnique({
        where: { id: recipe.id },
        include: {
          category: true,
          ingredients: {
            include: {
              ingredient: true
            }
          }
        }
      })

      res.status(201).json(createdRecipe)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error("Erro ao criar ficha técnica:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
      }
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
