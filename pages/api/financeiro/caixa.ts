import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Buscar todos os caixas
      const caixas = await prisma.cashRegister.findMany({
        orderBy: {
          created_at: 'desc'
        }
      })

      // Buscar caixa atual (aberto)
      const caixaAtual = await prisma.cashRegister.findFirst({
        where: {
          status: 'aberto'
        }
      })

      let caixaAtualDetalhes = null

      if (caixaAtual) {
        // Calcular totais do caixa atual
        const receitas = await prisma.revenue.findMany({
          where: {
            cash_register_id: caixaAtual.id
          }
        })

        const despesas = await prisma.expense.findMany({
          where: {
            cash_register_id: caixaAtual.id
          }
        })

        const totalReceitas = receitas.reduce((sum, r) => sum + Number(r.amount), 0)
        const totalDespesas = despesas.reduce((sum, d) => sum + Number(d.amount), 0)
        const saldo = Number(caixaAtual.initial_amount) + totalReceitas - totalDespesas

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
      const caixaAberto = await prisma.cashRegister.findFirst({
        where: {
          status: 'aberto'
        }
      })

      if (caixaAberto) {
        return res.status(400).json({ error: 'Já existe um caixa aberto' })
      }

      // Criar novo caixa
      const novoCaixa = await prisma.cashRegister.create({
        data: {
          initial_amount: valor_inicial,
          notes: observacoes,
          status: 'aberto',
          restaurant_id: 1 // TODO: Pegar do contexto de autenticação
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
      const caixaFechado = await prisma.cashRegister.update({
        where: {
          id: parseInt(caixa_id)
        },
        data: {
          closing_date: new Date(),
          final_amount: valor_final,
          notes: observacoes,
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