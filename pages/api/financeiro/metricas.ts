import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const receitas = await prisma.revenue.findMany({
        include: { category: true }
      })

      const despesas = await prisma.expense.findMany({
        include: { category: true }
      })

      const totalReceitas = receitas.reduce((sum: number, r: any) => sum + Number(r.amount), 0)
      const totalDespesas = despesas.reduce((sum: number, d: any) => sum + Number(d.amount), 0)
      const lucroBruto = totalReceitas - totalDespesas

      const hoje = new Date()
      const hojeInicio = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())

      const receitasHoje = receitas
        .filter((r: any) => new Date(r.revenue_date) >= hojeInicio)
        .reduce((sum: number, r: any) => sum + Number(r.amount), 0)

      const despesasHoje = despesas
        .filter((d: any) => new Date(d.expense_date) >= hojeInicio)
        .reduce((sum: number, d: any) => sum + Number(d.amount), 0)

      const lucroHoje = receitasHoje - despesasHoje

      const mesInicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1)

      const receitasMes = receitas
        .filter((r: any) => {
          const dataReceita = new Date(r.revenue_date)
          return dataReceita >= mesInicio && dataReceita <= hoje
        })
        .reduce((sum: number, r: any) => sum + Number(r.amount), 0)

      const despesasMes = despesas
        .filter((d: any) => {
          const dataDespesa = new Date(d.expense_date)
          return dataDespesa >= mesInicio && dataDespesa <= hoje
        })
        .reduce((sum: number, d: any) => sum + Number(d.amount), 0)

      const lucroMes = receitasMes - despesasMes

      const receitasPorCategoria = receitas.reduce((acc: any, r: any) => {
        const categoria = r.category?.name || 'Sem categoria'
        acc[categoria] = (acc[categoria] || 0) + Number(r.amount)
        return acc
      }, {})

      const despesasPorCategoria = despesas.reduce((acc: any, d: any) => {
        const categoria = d.category?.name || 'Sem categoria'
        acc[categoria] = (acc[categoria] || 0) + Number(d.amount)
        return acc
      }, {})

      res.status(200).json({
        totais: { receitas: totalReceitas, despesas: totalDespesas, lucroBruto },
        hoje: { receitas: receitasHoje, despesas: despesasHoje, lucro: lucroHoje },
        mes: { receitas: receitasMes, despesas: despesasMes, lucro: lucroMes },
        porCategoria: { receitas: receitasPorCategoria, despesas: despesasPorCategoria }
      })
    } catch (error) {
      console.error('Erro ao buscar métricas:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 