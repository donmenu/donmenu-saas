import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const { name, email, password, restaurantName, phone } = req.body

    // Validações
    if (!name || !email || !password || !restaurantName || !phone) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios' 
      })
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'A senha deve ter pelo menos 6 caracteres' 
      })
    }

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return res.status(400).json({ 
        error: 'Este email já está cadastrado' 
      })
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 12)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        phone: phone.trim(),
        role: 'owner',
        active: true
      }
    })

    // Criar restaurante
    const restaurant = await prisma.restaurant.create({
      data: {
        name: restaurantName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        userId: user.id,
        active: true,
        plan_type: 'free'
      }
    })

    // Criar categorias padrão
    const defaultCategories = [
      { name: 'Entradas', description: 'Pratos de entrada', color: '#FF6B6B', icon: '🍽️' },
      { name: 'Pratos Principais', description: 'Pratos principais', color: '#4ECDC4', icon: '🍖' },
      { name: 'Sobremesas', description: 'Sobremesas e doces', color: '#45B7D1', icon: '🍰' },
      { name: 'Bebidas', description: 'Bebidas e refrigerantes', color: '#96CEB4', icon: '🥤' },
      { name: 'Acompanhamentos', description: 'Acompanhamentos', color: '#FFEAA7', icon: '🥔' }
    ]

    for (const category of defaultCategories) {
      await prisma.category.create({
        data: {
          ...category,
          restaurant_id: restaurant.id,
          active: true
        }
      })
    }

    // Criar caixa padrão
    await prisma.cashRegister.create({
      data: {
        restaurant_id: restaurant.id,
        initial_amount: 0,
        status: 'aberto'
      }
    })

    // Criar categorias financeiras padrão
    const financialCategories = [
      { name: 'Vendas', type: 'revenue', color: '#10B981' },
      { name: 'Despesas Operacionais', type: 'expense', color: '#EF4444' },
      { name: 'Impostos', type: 'expense', color: '#F59E0B' },
      { name: 'Salários', type: 'expense', color: '#8B5CF6' }
    ]

    for (const category of financialCategories) {
      await prisma.financialCategory.create({
        data: {
          ...category,
          restaurant_id: restaurant.id
        }
      })
    }

    res.status(201).json({ 
      success: true, 
      message: 'Conta criada com sucesso!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      restaurant: {
        id: restaurant.id,
        name: restaurant.name
      }
    })

  } catch (error: any) {
    console.error('Erro ao criar conta:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor. Tente novamente.' 
    })
  }
} 