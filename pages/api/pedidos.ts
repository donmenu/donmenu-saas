import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { mesa, cliente_nome, itens, total } = req.body

      // Criar o pedido
      const pedido = await prisma.sale.create({
        data: {
          sale_number: `V${Date.now()}`,
          customer_name: cliente_nome,
          subtotal: total,
          total: total,
          payment_method: "pendente",
          status: "pending"
        }
      })

      // Criar os itens do pedido
      for (const item of itens) {
        await prisma.saleItem.create({
          data: {
            restaurant_id: 1, // ID do restaurante padrão
            sale_id: pedido.id,
            menu_item_id: item.item_id,
            quantity: item.quantidade,
            unit_price: item.preco_unit,
            total_price: item.preco_unit * item.quantidade
          }
        })
      }

      res.status(201).json({ 
        message: "Pedido criado com sucesso",
        pedido_id: pedido.id 
      })
    } catch (error) {
      console.error("Erro ao criar pedido:", error)
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  } else if (req.method === "GET") {
    try {
      const pedidos = await prisma.sale.findMany({
        include: {
          items: {
            include: {
              menu_item: true
            }
          }
        },
        orderBy: {
          created_at: "desc"
        }
      })

      res.status(200).json(pedidos)
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error)
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
