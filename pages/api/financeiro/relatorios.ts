import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { periodo } = req.query
      
      // Calcular datas baseado no período
      const hoje = new Date()
      let dataInicio = new Date()
      
      switch (periodo) {
        case '7dias':
          dataInicio.setDate(hoje.getDate() - 7)
          break
        case '30dias':
          dataInicio.setDate(hoje.getDate() - 30)
          break
        case '90dias':
          dataInicio.setDate(hoje.getDate() - 90)
          break
        default:
          dataInicio.setDate(hoje.getDate() - 30)
      }

      // Buscar receitas e despesas do período
      const receitas = await prisma.receitas.findMany({
        where: {
          data_receita: {
            gte: dataInicio,
            lte: hoje
          }
        },
        include: {
          categoria: true
        }
      })

      const despesas = await prisma.despesas.findMany({
        where: {
          data_despesa: {
            gte: dataInicio,
            lte: hoje
          }
        },
        include: {
          categoria: true
        }
      })

      // Calcular métricas gerais
      const totalReceitas = receitas.reduce((sum: number, r: any) => sum + Number(r.valor), 0)
      const totalDespesas = despesas.reduce((sum: number, d: any) => sum + Number(d.valor), 0)
      const lucroTotal = totalReceitas - totalDespesas
      const margemLucro = totalReceitas > 0 ? (lucroTotal / totalReceitas) * 100 : 0

      // Calcular médias diárias
      const dias = Math.ceil((hoje.getTime() - dataInicio.getTime()) / (1000 * 60 * 60 * 24))
      const mediaReceitasDiarias = totalReceitas / dias
      const mediaDespesasDiarias = totalDespesas / dias

      // Agrupar por categoria
      const receitasPorCategoria = receitas.reduce((acc: any, r: any) => {
        const categoria = r.categoria?.nome || 'Sem categoria'
        if (!acc[categoria]) {
          acc[categoria] = { nome: categoria, valor: 0, percentual: 0 }
        }
        acc[categoria].valor += Number(r.valor)
        return acc
      }, {})

      const despesasPorCategoria = despesas.reduce((acc: any, d: any) => {
        const categoria = d.categoria?.nome || 'Sem categoria'
        if (!acc[categoria]) {
          acc[categoria] = { nome: categoria, valor: 0, percentual: 0 }
        }
        acc[categoria].valor += Number(d.valor)
        return acc
      }, {})

      // Calcular percentuais
      Object.values(receitasPorCategoria).forEach((cat: any) => {
        cat.percentual = totalReceitas > 0 ? (cat.valor / totalReceitas) * 100 : 0
      })

      Object.values(despesasPorCategoria).forEach((cat: any) => {
        cat.percentual = totalDespesas > 0 ? (cat.valor / totalDespesas) * 100 : 0
      })

      // Gerar dados para gráfico de evolução (simulado)
      const relatorioData = [
        {
          periodo: 'Semana 1',
          receitas: totalReceitas * 0.3,
          despesas: totalDespesas * 0.3,
          lucro: (totalReceitas * 0.3) - (totalDespesas * 0.3),
          margem: totalReceitas > 0 ? (((totalReceitas * 0.3) - (totalDespesas * 0.3)) / (totalReceitas * 0.3)) * 100 : 0
        },
        {
          periodo: 'Semana 2',
          receitas: totalReceitas * 0.4,
          despesas: totalDespesas * 0.4,
          lucro: (totalReceitas * 0.4) - (totalDespesas * 0.4),
          margem: totalReceitas > 0 ? (((totalReceitas * 0.4) - (totalDespesas * 0.4)) / (totalReceitas * 0.4)) * 100 : 0
        },
        {
          periodo: 'Semana 3',
          receitas: totalReceitas * 0.3,
          despesas: totalDespesas * 0.3,
          lucro: (totalReceitas * 0.3) - (totalDespesas * 0.3),
          margem: totalReceitas > 0 ? (((totalReceitas * 0.3) - (totalDespesas * 0.3)) / (totalReceitas * 0.3)) * 100 : 0
        }
      ]

      res.status(200).json({
        relatorioData,
        receitasPorCategoria: Object.values(receitasPorCategoria),
        despesasPorCategoria: Object.values(despesasPorCategoria),
        metricasGerais: {
          totalReceitas,
          totalDespesas,
          lucroTotal,
          margemLucro,
          mediaReceitasDiarias,
          mediaDespesasDiarias
        }
      })
    } catch (error) {
      console.error('Erro ao gerar relatório:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 