import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getRestaurantIdFromSession } from '../../../lib/getRestaurantId'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const comboId = parseInt(String(id))

  if (isNaN(comboId)) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  if (req.method === "PUT") {
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
        active,
        items 
      } = req.body

      if (!name || !price) {
        return res.status(400).json({ 
          error: 'Nome e preço são obrigatórios' 
        })
      }

      if (price <= 0) {
        return res.status(400).json({ 
          error: 'O preço deve ser maior que zero' 
        })
      }

      const existingCombo = await prisma.combo.findFirst({
        where: {
          id: comboId,
          restaurant_id: restaurantId
        }
      })

      if (!existingCombo) {
        return res.status(404).json({ 
          error: 'Combo não encontrado' 
        })
      }

      // Verificar se já existe outro combo com o mesmo nome
      const duplicateCombo = await prisma.combo.findFirst({
        where: {
          restaurant_id: restaurantId,
          name: name.trim(),
          id: {
            not: comboId
          }
        }
      })

      if (duplicateCombo) {
        return res.status(400).json({ 
          error: 'Já existe um combo com este nome' 
        })
      }

      // Se items for fornecido, verificar se todos existem
      if (items && items.length > 0) {
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
      }

      // Atualizar o combo com transação
      const updatedCombo = await prisma.$transaction(async (tx) => {
        // Atualizar dados básicos do combo
        const combo = await tx.combo.update({
          where: {
            id: comboId
          },
          data: {
            name: name.trim(),
            description: description?.trim() || null,
            price: Number(price),
            discount: discount ? Number(discount) : null,
            valid_from: valid_from ? new Date(valid_from) : null,
            valid_to: valid_to ? new Date(valid_to) : null,
            image_url: image_url?.trim() || null,
            active: active !== undefined ? Boolean(active) : undefined
          }
        })

        // Se items for fornecido, atualizar os itens
        if (items) {
          // Remover itens existentes
          await tx.comboItem.deleteMany({
            where: {
              combo_id: comboId
            }
          })

          // Criar novos itens
          const comboItems = await Promise.all(
            (items as any[]).map(item => 
              tx.comboItem.create({
                data: {
                  restaurant_id: restaurantId,
                  combo_id: comboId,
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
            ...combo,
            items: comboItems
          }
        }

        // Se não houver items, retornar combo com itens existentes
        const comboWithItems = await tx.combo.findFirst({
          where: {
            id: comboId
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
          }
        })

        return comboWithItems
      })

      res.status(200).json(updatedCombo)
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao atualizar combo:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else if (req.method === "DELETE") {
    try {
      const restaurantId = await getRestaurantIdFromSession(req, res)

      const existingCombo = await prisma.combo.findFirst({
        where: {
          id: comboId,
          restaurant_id: restaurantId
        }
      })

      if (!existingCombo) {
        return res.status(404).json({ 
          error: 'Combo não encontrado' 
        })
      }

      // Verificar se o combo está sendo usado em vendas
      const comboInSales = await prisma.saleItem.findFirst({
        where: {
          combo_id: comboId
        }
      })

      if (comboInSales) {
        return res.status(400).json({ 
          error: 'Não é possível excluir um combo que já foi vendido' 
        })
      }

      // Excluir o combo (os itens serão excluídos automaticamente por CASCADE)
      await prisma.combo.delete({
        where: {
          id: comboId
        }
      })

      res.status(200).json({ message: 'Combo excluído com sucesso' })
    } catch (error: any) {
      if (error.message === 'Não autenticado' || error.message === 'Restaurante não encontrado para o usuário') {
        res.status(401).json({ error: error.message })
      } else {
        console.error('Erro ao excluir combo:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
      }
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 