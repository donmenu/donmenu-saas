import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getRestaurantIdFromSession } from '../../lib/getRestaurantId'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { search } = req.query
      const searchTerm = search ? String(search) : ''

      const cardapios = await prisma.menuItem.findMany({
        where: {
          restaurant_id: restaurantId,
          name: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        include: {
          category: true,
          menu: true
        },
        orderBy: {
          id: 'desc'
        }
      })

      res.status(200).json(cardapios)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao buscar cardápios:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else if (req.method === 'POST') {
    try {
      // Obter restaurant_id do usuário logado
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { 
        name, 
        description, 
        menu_id, 
        recipe_id, 
        category_id, 
        desired_margin, 
        manual_pricing, 
        price, 
        active 
      } = req.body;

      // Validações básicas
      if (!name || !menu_id) {
        return res.status(400).json({ error: 'Nome e menu_id são obrigatórios.' });
      }

      // Verificar se já existe um item com o mesmo nome no menu
      const existingItem = await prisma.menuItem.findFirst({
        where: {
          restaurant_id: restaurantId,
          menu_id: Number(menu_id),
          name: name.trim()
        }
      })

      if (existingItem) {
        return res.status(400).json({ 
          error: 'Já existe um item com este nome no cardápio' 
        })
      }

      let costPrice = 0
      let suggestedPrice = 0
      let actualMargin = 0
      let grossProfit = 0

      // Se foi fornecida uma receita, calcular custo automaticamente
      if (recipe_id) {
        const recipe = await prisma.recipe.findFirst({
          where: {
            id: Number(recipe_id),
            restaurant_id: restaurantId
          },
          include: {
            ingredients: {
              include: {
                ingredient: true
              }
            }
          }
        })

        if (!recipe) {
          return res.status(400).json({ 
            error: 'Receita não encontrada' 
          })
        }

        // Usar o custo por porção da receita
        costPrice = Number(recipe.cost_per_yield || 0)
        
        // Calcular preço sugerido baseado na margem desejada
        const margin = desired_margin ? Number(desired_margin) : 60 // Margem padrão de 60%
        suggestedPrice = costPrice / (1 - margin / 100)
        
        // Se não foi fornecido preço manual, usar o sugerido
        const finalPrice = manual_pricing ? Number(price) : suggestedPrice
        
        // Calcular margem real e lucro bruto
        grossProfit = finalPrice - costPrice
        actualMargin = costPrice > 0 ? (grossProfit / finalPrice) * 100 : 0

        const novoItem = await prisma.menuItem.create({
          data: {
            name: name.trim(),
            description: description?.trim() || null,
            menu_id: Number(menu_id),
            recipe_id: Number(recipe_id),
            category_id: category_id ? Number(category_id) : recipe.category_id,
            price: finalPrice,
            suggested_price: suggestedPrice,
            desired_margin: margin,
            cost_price: costPrice,
            gross_profit: grossProfit,
            actual_margin: actualMargin,
            manual_pricing: manual_pricing || false,
            restaurant_id: restaurantId,
            active: active !== undefined ? Boolean(active) : true,
          },
        });

        res.status(201).json(novoItem);
      } else {
        // Se não foi fornecida receita, criar item com preço manual
        if (price === undefined) {
          return res.status(400).json({ 
            error: 'Preço é obrigatório quando não há receita associada' 
          })
        }

        const novoItem = await prisma.menuItem.create({
          data: {
            name: name.trim(),
            description: description?.trim() || null,
            menu_id: Number(menu_id),
            category_id: category_id ? Number(category_id) : null,
            price: Number(price),
            manual_pricing: true,
            restaurant_id: restaurantId,
            active: active !== undefined ? Boolean(active) : true,
          },
        });

        res.status(201).json(novoItem);
      }
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao criar cardápio:', error);
        res.status(500).json({ error: 'Erro ao criar cardápio.' });
      }
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 