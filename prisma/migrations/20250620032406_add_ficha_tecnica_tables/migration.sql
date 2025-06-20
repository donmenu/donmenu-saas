-- CreateTable
CREATE TABLE "teste" (
    "idteste" INTEGER NOT NULL,

    CONSTRAINT "teste_pkey" PRIMARY KEY ("idteste")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "obs" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cardapios" (
    "id" SERIAL NOT NULL,
    "item" TEXT,
    "status" TEXT,

    CONSTRAINT "cardapios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "ingredient_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "cost_per_unit" DECIMAL(65,30) NOT NULL,
    "stock" DECIMAL(65,30) DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("ingredient_id")
);

-- CreateTable
CREATE TABLE "item_ingredients" (
    "item_ingredient_id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30),

    CONSTRAINT "item_ingredients_pkey" PRIMARY KEY ("item_ingredient_id")
);

-- CreateTable
CREATE TABLE "itens" (
    "item_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itens_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "itens_pricing" (
    "item_pricing_id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "rule_id" INTEGER NOT NULL,

    CONSTRAINT "itens_pricing_pkey" PRIMARY KEY ("item_pricing_id")
);

-- CreateTable
CREATE TABLE "menu_items_price" (
    "menu_item_price_id" SERIAL NOT NULL,
    "menu_item_id" INTEGER,
    "price" DECIMAL(65,30),
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),

    CONSTRAINT "menu_items_price_pkey" PRIMARY KEY ("menu_item_price_id")
);

-- CreateTable
CREATE TABLE "menu_itens" (
    "menu_item_id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "menu_itens_pkey" PRIMARY KEY ("menu_item_id")
);

-- CreateTable
CREATE TABLE "menu_promotions" (
    "menu_promotion_id" SERIAL NOT NULL,
    "menu_id" INTEGER,
    "name" TEXT,
    "description" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),

    CONSTRAINT "menu_promotions_pkey" PRIMARY KEY ("menu_promotion_id")
);

-- CreateTable
CREATE TABLE "menus" (
    "menu_id" SERIAL NOT NULL,
    "restaurant_id" INTEGER,
    "name" TEXT,
    "description" TEXT,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("menu_id")
);

-- CreateTable
CREATE TABLE "pricing_methods" (
    "method_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "pricing_methods_pkey" PRIMARY KEY ("method_id")
);

-- CreateTable
CREATE TABLE "pricing_rules" (
    "rule_id" SERIAL NOT NULL,
    "method_id" INTEGER,
    "name" TEXT,
    "description" TEXT,
    "calculation_formula" TEXT,

    CONSTRAINT "pricing_rules_pkey" PRIMARY KEY ("rule_id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "restaurant_id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("restaurant_id")
);

-- CreateTable
CREATE TABLE "fichas_tecnicas" (
    "ficha_id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "yield" DECIMAL(65,30),
    "total_cost" DECIMAL(65,30),
    "price_suggestion" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fichas_tecnicas_pkey" PRIMARY KEY ("ficha_id")
);

-- CreateTable
CREATE TABLE "ficha_ingredientes" (
    "id" SERIAL NOT NULL,
    "ficha_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ficha_ingredientes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "restaurant_id_idx" ON "menus"("restaurant_id");

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas_tecnicas" ADD CONSTRAINT "fichas_tecnicas_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "itens"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ficha_ingredientes" ADD CONSTRAINT "ficha_ingredientes_ficha_id_fkey" FOREIGN KEY ("ficha_id") REFERENCES "fichas_tecnicas"("ficha_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ficha_ingredientes" ADD CONSTRAINT "ficha_ingredientes_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("ingredient_id") ON DELETE RESTRICT ON UPDATE CASCADE;
