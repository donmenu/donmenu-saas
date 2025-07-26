import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getRestaurantIdFromSession } from '../../lib/getRestaurantId'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { search } = req.query
      const searchTerm = search ? String(search) : ''

      const combos = await prisma.combo.findMany({
        where: {
          restaurant_id: restaurantId,
          name: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        include: {
          items: {
            include: {
              menu_item: {
                include: {
                  category: true,
                  menu: true
                }
              }
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      })

      // Calcular preços originais e economias
      const combosWithCalculations = combos.map(combo => {
        const totalOriginalPrice = combo.items.reduce((sum, item) => {
          return sum + (Number(item.menu_item.price) * item.quantity)
        }, 0)

        const totalSavings = totalOriginalPrice - Number(combo.price)

        return {
          ...combo,
          total_original_price: totalOriginalPrice,
          total_savings: totalSavings
        }
      })

      res.status(200).json(combosWithCalculations)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao buscar combos:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else if (req.method === "POST") {
    try {
      const restaurantId = await getRestaurantIdFromSession(req, res)
      
      const { 
        name, 
        description, 
        price, 
        discount, 
        valid_from, 
        valid_to, 
        image_url,
        items 
      } = req.body

      if (!name || !price || !items || items.length === 0) {
        return res.status(400).json({ 
          error: 'Nome, preço e pelo menos um item são obrigatórios' 
        })
      }

      if (price <= 0) {
        return res.status(400).json({ 
          error: 'O preço deve ser maior que zero' 
        })
      }

      // Verificar se já existe um combo com o mesmo nome
      const existingCombo = await prisma.combo.findFirst({
        where: {
          restaurant_id: restaurantId,
          name: name.trim()
        }
      })

      if (existingCombo) {
        return res.status(400).json({ 
          error: 'Já existe um combo com este nome' 
        })
      }

      // Verificar se todos os itens existem e pertencem ao restaurante
      for (const item of items as any[]) {
        const menuItem = await prisma.menuItem.findFirst({
          where: {
            id: item.menu_item_id,
            restaurant_id: restaurantId
          }
        })

        if (!menuItem) {
          return res.status(400).json({ 
            error: `Item com ID ${item.menu_item_id} não encontrado` 
          })
        }

        if (item.quantity <= 0) {
          return res.status(400).json({ 
            error: 'A quantidade deve ser maior que zero' 
          })
        }
      }

      // Criar o combo com transação
      const combo = await prisma.$transaction(async (tx) => {
        const newCombo = await tx.combo.create({
          data: {
            restaurant_id: restaurantId,
            name: name.trim(),
            description: description?.trim() || null,
            price: Number(price),
            discount: discount ? Number(discount) : null,
            valid_from: valid_from ? new Date(valid_from) : null,
            valid_to: valid_to ? new Date(valid_to) : null,
            image_url: image_url?.trim() || null
          }
        })

        // Criar os itens do combo
        const comboItems = await Promise.all(
          (items as any[]).map(item => 
            tx.comboItem.create({
              data: {
                restaurant_id: restaurantId,
                combo_id: newCombo.id,
                menu_item_id: item.menu_item_id,
                quantity: item.quantity,
                discount: item.discount ? Number(item.discount) : null
              },
              include: {
                menu_item: {
                  include: {
                    category: true,
                    menu: true
                  }
                }
              }
            })
          )
        )

        return {
          ...newCombo,
          items: comboItems
        }
      })

      res.status(201).json(combo)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao criar combo:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 