-- CreateTable
CREATE TABLE "caixa" (
    "caixa_id" SERIAL NOT NULL,
    "data_abertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_fechamento" TIMESTAMP(3),
    "valor_inicial" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "valor_final" DECIMAL(65,30),
    "observacoes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'aberto',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "caixa_pkey" PRIMARY KEY ("caixa_id")
);

-- CreateTable
CREATE TABLE "categorias_financeiras" (
    "categoria_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT,
    "cor" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_financeiras_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateTable
CREATE TABLE "receitas" (
    "receita_id" SERIAL NOT NULL,
    "caixa_id" INTEGER,
    "categoria_id" INTEGER,
    "pedido_id" INTEGER,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "data_receita" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "forma_pagamento" TEXT,
    "observacoes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receitas_pkey" PRIMARY KEY ("receita_id")
);

-- CreateTable
CREATE TABLE "despesas" (
    "despesa_id" SERIAL NOT NULL,
    "caixa_id" INTEGER,
    "categoria_id" INTEGER,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "data_despesa" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "forma_pagamento" TEXT,
    "fornecedor" TEXT,
    "nota_fiscal" TEXT,
    "observacoes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "despesas_pkey" PRIMARY KEY ("despesa_id")
);

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixa"("caixa_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias_financeiras"("categoria_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("pedido_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixa"("caixa_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias_financeiras"("categoria_id") ON DELETE SET NULL ON UPDATE CASCADE;
