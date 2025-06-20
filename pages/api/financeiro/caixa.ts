import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Buscar todos os caixas
      const caixas = await prisma.caixa.findMany({
        orderBy: {
          created_at: 'desc'
        }
      })

      // Buscar caixa atual (aberto)
      const caixaAtual = await prisma.caixa.findFirst({
        where: {
          status: 'aberto'
        }
      })

      let caixaAtualDetalhes = null

      if (caixaAtual) {
        // Calcular totais do caixa atual
        const receitas = await prisma.receitas.findMany({
          where: {
            caixa_id: caixaAtual.caixa_id
          }
        })

        const despesas = await prisma.despesas.findMany({
          where: {
            caixa_id: caixaAtual.caixa_id
          }
        })

        const totalReceitas = receitas.reduce((sum, r) => sum + Number(r.valor), 0)
        const totalDespesas = despesas.reduce((sum, d) => sum + Number(d.valor), 0)
        const saldo = Number(caixaAtual.valor_inicial) + totalReceitas - totalDespesas

        caixaAtualDetalhes = {
          caixa: caixaAtual,
          totalReceitas,
          totalDespesas,
          saldo
        }
      }

      res.status(200).json({
        caixas,
        caixaAtual: caixaAtualDetalhes
      })
    } catch (error) {
      console.error('Erro ao buscar dados do caixa:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else if (req.method === 'POST') {
    try {
      const { valor_inicial, observacoes } = req.body

      // Verificar se já existe um caixa aberto
      const caixaAberto = await prisma.caixa.findFirst({
        where: {
          status: 'aberto'
        }
      })

      if (caixaAberto) {
        return res.status(400).json({ error: 'Já existe um caixa aberto' })
      }

      // Criar novo caixa
      const novoCaixa = await prisma.caixa.create({
        data: {
          valor_inicial,
          observacoes,
          status: 'aberto'
        }
      })

      res.status(201).json(novoCaixa)
    } catch (error) {
      console.error('Erro ao abrir caixa:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else if (req.method === 'PATCH') {
    try {
      const { caixa_id, valor_final, observacoes } = req.body

      // Fechar caixa
      const caixaFechado = await prisma.caixa.update({
        where: {
          caixa_id: parseInt(caixa_id)
        },
        data: {
          data_fechamento: new Date(),
          valor_final,
          observacoes,
          status: 'fechado'
        }
      })

      res.status(200).json(caixaFechado)
    } catch (error) {
      console.error('Erro ao fechar caixa:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 