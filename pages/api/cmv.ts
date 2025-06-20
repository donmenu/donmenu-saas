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

      // Buscar vendas do período
      const vendas = await prisma.sale.findMany({
        where: { created_at: { gte: dataInicio } },
        include: { items: { include: { menu_item: true } } }
      })

      // Buscar receitas (fichas técnicas)
      const receitas = await prisma.recipe.findMany({
        include: {
          menu_items: true,
          ingredients: { include: { ingredient: true } }
        }
      })

      // Mapear custo unitário por menu_item
      const custoPorMenuItem: Record<number, number> = {}
      receitas.forEach(receita => {
        const custo = receita.ingredients.reduce(
          (sum, ri) => sum + Number(ri.quantity) * Number(ri.ingredient.cost_per_unit), 0
        )
        receita.menu_items.forEach(mi => {
          custoPorMenuItem[mi.id] = custo
        })
      })

      // Calcular vendas e custos
      let faturamento = 0
      let custoTotal = 0
      const produtos: any[] = []

      const vendasPorMenuItem: Record<number, number> = {}
      vendas.forEach(venda => {
        venda.items.forEach(item => {
          faturamento += Number(item.unit_price) * item.quantity
          custoTotal += (custoPorMenuItem[item.menu_item_id] || 0) * item.quantity
          vendasPorMenuItem[item.menu_item_id] = (vendasPorMenuItem[item.menu_item_id] || 0) + item.quantity
        })
      })

      // Detalhe por produto
      for (const receita of receitas) {
        for (const mi of receita.menu_items) {
          const vendas = vendasPorMenuItem[mi.id] || 0
          const custo = custoPorMenuItem[mi.id] * vendas
          const receitaTotal = Number(mi.price) * vendas
          produtos.push({
            nome: mi.name,
            vendas,
            custo_unitario: custoPorMenuItem[mi.id],
            custo_total: custo,
            receita: receitaTotal,
            cmv: receitaTotal > 0 ? (custo / receitaTotal) * 100 : 0
          })
        }
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