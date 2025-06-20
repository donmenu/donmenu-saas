import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { periodo } = req.query
      let dias = 7 // padrão 7 dias
      
      if (periodo === '30dias') dias = 30
      else if (periodo === '90dias') dias = 90

      const dataInicio = new Date()
      dataInicio.setDate(dataInicio.getDate() - dias)
      
      const hoje = new Date()
      hoje.setHours(23, 59, 59, 999)

      // Buscar receitas do período
      const receitas = await prisma.receitas.findMany({
        where: {
          data_receita: {
            gte: dataInicio,
            lte: hoje
          }
        }
      })

      // Buscar despesas do período
      const despesas = await prisma.despesas.findMany({
        where: {
          data_despesa: {
            gte: dataInicio,
            lte: hoje
          }
        }
      })

      // Calcular métricas totais
      const totalReceitas = receitas.reduce((sum, r) => sum + Number(r.valor), 0)
      const totalDespesas = despesas.reduce((sum, d) => sum + Number(d.valor), 0)
      const lucro = totalReceitas - totalDespesas
      const margemLucro = totalReceitas > 0 ? (lucro / totalReceitas) * 100 : 0

      // Calcular métricas de hoje
      const hojeInicio = new Date()
      hojeInicio.setHours(0, 0, 0, 0)
      
      const receitasHoje = receitas
        .filter(r => new Date(r.data_receita) >= hojeInicio)
        .reduce((sum, r) => sum + Number(r.valor), 0)
      
      const despesasHoje = despesas
        .filter(d => new Date(d.data_despesa) >= hojeInicio)
        .reduce((sum, d) => sum + Number(d.valor), 0)
      
      const lucroHoje = receitasHoje - despesasHoje

      // Gerar dados para o gráfico
      const chartData: any[] = []
      for (let i = dias - 1; i >= 0; i--) {
        const data = new Date()
        data.setDate(data.getDate() - i)
        data.setHours(0, 0, 0, 0)
        
        const dataFim = new Date(data)
        dataFim.setHours(23, 59, 59, 999)
        
        const receitasDia = receitas
          .filter(r => {
            const dataReceita = new Date(r.data_receita)
            return dataReceita >= data && dataReceita <= dataFim
          })
          .reduce((sum, r) => sum + Number(r.valor), 0)
        
        const despesasDia = despesas
          .filter(d => {
            const dataDespesa = new Date(d.data_despesa)
            return dataDespesa >= data && dataDespesa <= dataFim
          })
          .reduce((sum, d) => sum + Number(d.valor), 0)
        
        const lucroDia = receitasDia - despesasDia
        
        chartData.push({
          data: data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
          receitas: receitasDia,
          despesas: despesasDia,
          lucro: lucroDia
        })
      }

      res.status(200).json({
        metrics: {
          totalReceitas,
          totalDespesas,
          lucro,
          margemLucro,
          receitasHoje,
          despesasHoje,
          lucroHoje
        },
        chartData
      })
    } catch (error) {
      console.error('Erro ao calcular métricas financeiras:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 