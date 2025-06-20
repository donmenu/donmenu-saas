-- CreateTable
CREATE TABLE "pedidos" (
    "pedido_id" SERIAL NOT NULL,
    "mesa" TEXT,
    "cliente_nome" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "observacoes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("pedido_id")
);

-- CreateTable
CREATE TABLE "pedido_itens" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "preco_unit" DECIMAL(65,30) NOT NULL,
    "observacoes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedido_itens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("pedido_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "itens"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
