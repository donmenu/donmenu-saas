export interface Categoria {
  categoria_id: number
  nome: string
  tipo: string
  descricao?: string
  cor?: string
}

export interface Caixa {
  caixa_id: number
  valor_inicial: number
  valor_final?: number
  data_abertura: string
  data_fechamento?: string
  status: 'aberto' | 'fechado'
  observacoes?: string
  created_at: string
}

export interface Receita {
  receita_id: number
  caixa_id?: number
  categoria_id?: number
  pedido_id?: number
  descricao: string
  valor: number
  data_receita: string
  forma_pagamento?: string
  observacoes?: string
  created_at: string
  categoria?: Categoria
}

export interface Despesa {
  despesa_id: number
  caixa_id?: number
  categoria_id?: number
  descricao: string
  valor: number
  data_despesa: string
  forma_pagamento?: string
  fornecedor?: string
  nota_fiscal?: string
  observacoes?: string
  created_at: string
  categoria?: Categoria
}

export interface MetricasFinanceiras {
  totalReceitas: number
  totalDespesas: number
  lucroTotal: number
  margemLucro: number
  receitasHoje: number
  despesasHoje: number
  caixaAberto: boolean
  saldoCaixa: number
}

export interface RelatorioData {
  periodo: string
  receitas: number
  despesas: number
  lucro: number
  margem: number
}

export interface CategoriaData {
  nome: string
  valor: number
  percentual: number
  cor: string
}

export interface RelatorioCompleto {
  relatorioData: RelatorioData[]
  receitasPorCategoria: CategoriaData[]
  despesasPorCategoria: CategoriaData[]
  metricasGerais: {
    totalReceitas: number
    totalDespesas: number
    lucroTotal: number
    margemLucro: number
    mediaReceitasDiarias: number
    mediaDespesasDiarias: number
  }
} 