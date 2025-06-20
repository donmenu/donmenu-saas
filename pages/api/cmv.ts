import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { periodo = '30dias' } = req.query
      const dias = periodo === '7dias' ? 7 : periodo === '90dias' ? 90 : 30
      const dataInicio = new Date()
      dataInicio.setDate(dataInicio.getDate() - dias)

      // Buscar pedidos do período
      const pedidos = await prisma.pedidos.findMany({
        where: { created_at: { gte: dataInicio } },
        include: { pedido_itens: { include: { item: true } } }
      })

      // Buscar fichas técnicas
      const fichas = await prisma.fichas_tecnicas.findMany({
        include: {
          item: true,
          ficha_ingredientes: { include: { ingredient: true } }
        }
      })

      // Mapear custo unitário por item
      const custoPorItem: Record<number, number> = {}
      fichas.forEach(ficha => {
        const custo = ficha.ficha_ingredientes.reduce(
          (sum, fi) => sum + Number(fi.quantity) * Number(fi.ingredient.cost_per_unit), 0
        )
        custoPorItem[ficha.item_id] = custo
      })

      // Calcular vendas e custos
      let faturamento = 0
      let custoTotal = 0
      const produtos: any[] = []

      const vendasPorItem: Record<number, number> = {}
      pedidos.forEach(pedido => {
        pedido.pedido_itens.forEach(pi => {
          faturamento += Number(pi.preco_unit) * pi.quantidade
          custoTotal += (custoPorItem[pi.item_id] || 0) * pi.quantidade
          vendasPorItem[pi.item_id] = (vendasPorItem[pi.item_id] || 0) + pi.quantidade
        })
      })

      // Detalhe por produto
      for (const ficha of fichas) {
        const vendas = vendasPorItem[ficha.item_id] || 0
        const custo = custoPorItem[ficha.item_id] * vendas
        const receita = Number(ficha.item.price) * vendas
        produtos.push({
          nome: ficha.item.name,
          vendas,
          custo_unitario: custoPorItem[ficha.item_id],
          custo_total: custo,
          receita,
          cmv: receita > 0 ? (custo / receita) * 100 : 0
        })
      }

      const cmvGeral = faturamento > 0 ? (custoTotal / faturamento) * 100 : 0

      res.status(200).json({
        cmvGeral,
        faturamento,
        custoTotal,
        produtos
      })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao calcular CMV' })
    }
  } else {
    res.status(405).end()
  }
} 