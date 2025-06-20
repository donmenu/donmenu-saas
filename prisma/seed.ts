import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar categorias financeiras para receitas
  const categoriasReceitas = [
    { nome: 'Vendas de Alimentos', tipo: 'receita', descricao: 'Receitas provenientes da venda de alimentos' },
    { nome: 'Vendas de Bebidas', tipo: 'receita', descricao: 'Receitas provenientes da venda de bebidas' },
    { nome: 'Delivery', tipo: 'receita', descricao: 'Receitas de pedidos delivery' },
    { nome: 'Eventos', tipo: 'receita', descricao: 'Receitas de eventos e festas' },
    { nome: 'Outros', tipo: 'receita', descricao: 'Outras receitas' },
  ]

  // Criar categorias financeiras para despesas
  const categoriasDespesas = [
    { nome: 'Insumos e Ingredientes', tipo: 'despesa', descricao: 'Compra de ingredientes e insumos' },
    { nome: 'Funcionários', tipo: 'despesa', descricao: 'Salários e benefícios de funcionários' },
    { nome: 'Aluguel', tipo: 'despesa', descricao: 'Aluguel do estabelecimento' },
    { nome: 'Contas Públicas', tipo: 'despesa', descricao: 'Água, luz, gás, internet' },
    { nome: 'Manutenção', tipo: 'despesa', descricao: 'Manutenção de equipamentos' },
    { nome: 'Marketing', tipo: 'despesa', descricao: 'Publicidade e marketing' },
    { nome: 'Impostos', tipo: 'despesa', descricao: 'Impostos e taxas' },
    { nome: 'Outros', tipo: 'despesa', descricao: 'Outras despesas' },
  ]

  console.log('📊 Criando categorias financeiras...')
  for (const categoria of [...categoriasReceitas, ...categoriasDespesas]) {
    try {
      await prisma.categorias_financeiras.create({
        data: categoria,
      })
      console.log(`✅ Categoria criada: ${categoria.nome}`)
    } catch (error) {
      console.log(`⚠️ Categoria já existe: ${categoria.nome}`)
    }
  }

  // Criar um caixa aberto de exemplo
  console.log('💰 Criando caixa inicial...')
  const caixaAberto = await prisma.caixa.findFirst({
    where: { status: 'aberto' }
  })

  if (!caixaAberto) {
    await prisma.caixa.create({
      data: {
        valor_inicial: 100.00,
        status: 'aberto',
        observacoes: 'Caixa inicial do sistema'
      }
    })
    console.log('✅ Caixa inicial criado')
  } else {
    console.log('⚠️ Caixa já existe')
  }

  // Criar algumas receitas de exemplo
  console.log('📈 Criando receitas de exemplo...')
  const receitasExemplo = [
    {
      descricao: 'Venda de X-Burger',
      valor: 25.90,
      forma_pagamento: 'dinheiro',
      observacoes: 'Venda realizada na mesa 1'
    },
    {
      descricao: 'Venda de Batata Frita',
      valor: 12.90,
      forma_pagamento: 'cartao',
      observacoes: 'Venda realizada na mesa 2'
    },
    {
      descricao: 'Delivery - X-Burger',
      valor: 30.90,
      forma_pagamento: 'pix',
      observacoes: 'Pedido delivery - taxa de entrega incluída'
    }
  ]

  for (const receita of receitasExemplo) {
    try {
      await prisma.receitas.create({
        data: {
          ...receita,
          data_receita: new Date()
        }
      })
      console.log(`✅ Receita criada: ${receita.descricao}`)
    } catch (error) {
      console.log(`⚠️ Erro ao criar receita: ${receita.descricao}`)
    }
  }

  // Criar algumas despesas de exemplo
  console.log('📉 Criando despesas de exemplo...')
  const despesasExemplo = [
    {
      descricao: 'Compra de Carne Bovina',
      valor: 150.00,
      forma_pagamento: 'dinheiro',
      fornecedor: 'Frigorífico Silva',
      nota_fiscal: 'NF001/2024',
      observacoes: 'Compra de 6kg de carne bovina'
    },
    {
      descricao: 'Conta de Luz',
      valor: 89.50,
      forma_pagamento: 'boleto',
      fornecedor: 'Companhia de Energia',
      nota_fiscal: 'FAT001/2024',
      observacoes: 'Conta de luz do mês'
    },
    {
      descricao: 'Manutenção do Freezer',
      valor: 200.00,
      forma_pagamento: 'pix',
      fornecedor: 'Técnico João',
      observacoes: 'Manutenção preventiva do freezer'
    }
  ]

  for (const despesa of despesasExemplo) {
    try {
      await prisma.despesas.create({
        data: {
          ...despesa,
          data_despesa: new Date()
        }
      })
      console.log(`✅ Despesa criada: ${despesa.descricao}`)
    } catch (error) {
      console.log(`⚠️ Erro ao criar despesa: ${despesa.descricao}`)
    }
  }

  console.log('✅ Seed concluído com sucesso!')
  console.log('📊 Dados criados:')
  console.log(`   - ${categoriasReceitas.length + categoriasDespesas.length} categorias financeiras`)
  console.log(`   - 1 caixa inicial`)
  console.log(`   - ${receitasExemplo.length} receitas de exemplo`)
  console.log(`   - ${despesasExemplo.length} despesas de exemplo`)
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
