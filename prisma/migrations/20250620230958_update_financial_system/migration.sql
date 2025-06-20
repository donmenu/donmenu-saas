/*
  Warnings:

  - You are about to alter the column `valor_inicial` on the `caixa` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `valor_final` on the `caixa` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `status` on the `caixa` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `nome` on the `categorias_financeiras` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `tipo` on the `categorias_financeiras` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `cor` on the `categorias_financeiras` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(7)`.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `categories` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `valor` on the `despesas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `forma_pagamento` on the `despesas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `fornecedor` on the `despesas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `nota_fiscal` on the `despesas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - The primary key for the `ingredients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ingredient_id` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `ingredients` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `ingredients` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `unit` on the `ingredients` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `cost_per_unit` on the `ingredients` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - The primary key for the `menus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `menu_id` on the `menus` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `menus` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `cliente_nome` on the `pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `mesa` on the `pedidos` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `pedidos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `total` on the `pedidos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `valor` on the `receitas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `forma_pagamento` on the `receitas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - The primary key for the `restaurants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `restaurant_id` on the `restaurants` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `restaurants` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `obs` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `cardapios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ficha_ingredientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fichas_tecnicas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item_ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itens_pricing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_items_price` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_itens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_promotions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedido_itens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pricing_methods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pricing_rules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teste` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[restaurant_id,nome,tipo]` on the table `categorias_financeiras` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restaurant_id,name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restaurant_id,name]` on the table `ingredients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restaurant_id,name]` on the table `menus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restaurant_id,numero_pedido]` on the table `pedidos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[google_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restaurant_id` to the `caixa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `categorias_financeiras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `despesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Made the column `restaurant_id` on table `menus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `menus` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `numero_pedido` to the `pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `receitas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `restaurants` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `restaurants` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `restaurant_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ficha_ingredientes" DROP CONSTRAINT "ficha_ingredientes_ficha_id_fkey";

-- DropForeignKey
ALTER TABLE "ficha_ingredientes" DROP CONSTRAINT "ficha_ingredientes_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "fichas_tecnicas" DROP CONSTRAINT "fichas_tecnicas_item_id_fkey";

-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_category_id_fkey";

-- DropForeignKey
ALTER TABLE "pedido_itens" DROP CONSTRAINT "pedido_itens_item_id_fkey";

-- DropForeignKey
ALTER TABLE "pedido_itens" DROP CONSTRAINT "pedido_itens_pedido_id_fkey";

-- AlterTable
ALTER TABLE "caixa" ADD COLUMN     "restaurant_id" INTEGER NOT NULL,
ALTER COLUMN "valor_inicial" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "valor_final" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "status" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "categorias_financeiras" ADD COLUMN     "restaurant_id" INTEGER NOT NULL,
ALTER COLUMN "nome" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "tipo" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "cor" SET DATA TYPE VARCHAR(7);

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "category_id",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "color" VARCHAR(7),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "icon" VARCHAR(50),
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "restaurant_id" INTEGER NOT NULL,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "despesas" ADD COLUMN     "restaurant_id" INTEGER NOT NULL,
ALTER COLUMN "valor" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "forma_pagamento" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "fornecedor" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "nota_fiscal" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_pkey",
DROP COLUMN "ingredient_id",
DROP COLUMN "stock",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "current_stock" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "min_stock" DECIMAL(10,2),
ADD COLUMN     "restaurant_id" INTEGER NOT NULL,
ADD COLUMN     "supplier" VARCHAR(255),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "unit" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "cost_per_unit" SET DATA TYPE DECIMAL(10,2),
ADD CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "menus" DROP CONSTRAINT "menus_pkey",
DROP COLUMN "menu_id",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type" VARCHAR(50) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "restaurant_id" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "menus_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "pedidos" DROP COLUMN "cliente_nome",
DROP COLUMN "mesa",
ADD COLUMN     "desconto" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "forma_pagamento" VARCHAR(50),
ADD COLUMN     "nome_cliente" VARCHAR(255),
ADD COLUMN     "numero_mesa" VARCHAR(10),
ADD COLUMN     "numero_pedido" VARCHAR(50) NOT NULL,
ADD COLUMN     "restaurant_id" INTEGER NOT NULL,
ADD COLUMN     "subtotal" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "telefone_cliente" VARCHAR(20),
ALTER COLUMN "status" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "total" DROP DEFAULT,
ALTER COLUMN "total" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "receitas" ADD COLUMN     "restaurant_id" INTEGER NOT NULL,
ALTER COLUMN "valor" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "forma_pagamento" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_pkey",
DROP COLUMN "restaurant_id",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" VARCHAR(100),
ADD COLUMN     "cnpj" VARCHAR(18),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "logo_url" VARCHAR(500),
ADD COLUMN     "phone" VARCHAR(20),
ADD COLUMN     "plan_type" VARCHAR(20) NOT NULL DEFAULT 'free',
ADD COLUMN     "state" VARCHAR(2),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "zip_code" VARCHAR(10),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "obs",
DROP COLUMN "username",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "avatar_url" VARCHAR(500),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "google_id" VARCHAR(255),
ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "password" VARCHAR(255),
ADD COLUMN     "restaurant_id" INTEGER NOT NULL,
ADD COLUMN     "role" VARCHAR(20) NOT NULL DEFAULT 'user',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "cardapios";

-- DropTable
DROP TABLE "ficha_ingredientes";

-- DropTable
DROP TABLE "fichas_tecnicas";

-- DropTable
DROP TABLE "item_ingredients";

-- DropTable
DROP TABLE "itens";

-- DropTable
DROP TABLE "itens_pricing";

-- DropTable
DROP TABLE "menu_items_price";

-- DropTable
DROP TABLE "menu_itens";

-- DropTable
DROP TABLE "menu_promotions";

-- DropTable
DROP TABLE "pedido_itens";

-- DropTable
DROP TABLE "pricing_methods";

-- DropTable
DROP TABLE "pricing_rules";

-- DropTable
DROP TABLE "teste";

-- CreateTable
CREATE TABLE "ingredient_prices" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "supplier" VARCHAR(255),
    "valid_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valid_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredient_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "category_id" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "yield_quantity" DECIMAL(10,2) NOT NULL,
    "yield_unit" VARCHAR(20) NOT NULL,
    "preparation_time" INTEGER,
    "difficulty" VARCHAR(20),
    "instructions" TEXT,
    "image_url" VARCHAR(500),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "total_cost" DECIMAL(10,2),
    "cost_per_yield" DECIMAL(10,2),

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_ingredients" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" DECIMAL(10,4) NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "cost" DECIMAL(10,2),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipe_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "recipe_id" INTEGER,
    "category_id" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "suggested_price" DECIMAL(10,2),
    "desired_margin" DECIMAL(5,2),
    "cost_price" DECIMAL(10,2),
    "gross_profit" DECIMAL(10,2),
    "actual_margin" DECIMAL(5,2),
    "manual_pricing" BOOLEAN NOT NULL DEFAULT false,
    "image_url" VARCHAR(500),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combos" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(5,2),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "valid_from" TIMESTAMP(3),
    "valid_to" TIMESTAMP(3),
    "image_url" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "combos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combo_items" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "combo_id" INTEGER NOT NULL,
    "menu_item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "discount" DECIMAL(5,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "combo_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "sale_number" VARCHAR(50) NOT NULL,
    "customer_name" VARCHAR(255),
    "customer_phone" VARCHAR(20),
    "subtotal" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL,
    "payment_method" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'completed',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_items" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "sale_id" INTEGER NOT NULL,
    "menu_item_id" INTEGER NOT NULL,
    "combo_id" INTEGER,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "cost_price" DECIMAL(10,2),
    "gross_profit" DECIMAL(10,2),
    "margin" DECIMAL(5,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sale_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_pedido" (
    "item_pedido_id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "item_cardapio_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DECIMAL(10,2) NOT NULL,
    "preco_total" DECIMAL(10,2) NOT NULL,
    "observacoes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itens_pedido_pkey" PRIMARY KEY ("item_pedido_id")
);

-- CreateIndex
CREATE INDEX "ingredient_prices_restaurant_id_ingredient_id_idx" ON "ingredient_prices"("restaurant_id", "ingredient_id");

-- CreateIndex
CREATE INDEX "ingredient_prices_ingredient_id_valid_from_idx" ON "ingredient_prices"("ingredient_id", "valid_from");

-- CreateIndex
CREATE INDEX "recipes_restaurant_id_idx" ON "recipes"("restaurant_id");

-- CreateIndex
CREATE INDEX "recipes_restaurant_id_category_id_idx" ON "recipes"("restaurant_id", "category_id");

-- CreateIndex
CREATE INDEX "recipes_restaurant_id_active_idx" ON "recipes"("restaurant_id", "active");

-- CreateIndex
CREATE UNIQUE INDEX "recipes_restaurant_id_name_key" ON "recipes"("restaurant_id", "name");

-- CreateIndex
CREATE INDEX "recipe_ingredients_restaurant_id_recipe_id_idx" ON "recipe_ingredients"("restaurant_id", "recipe_id");

-- CreateIndex
CREATE INDEX "recipe_ingredients_ingredient_id_idx" ON "recipe_ingredients"("ingredient_id");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_ingredients_restaurant_id_recipe_id_ingredient_id_key" ON "recipe_ingredients"("restaurant_id", "recipe_id", "ingredient_id");

-- CreateIndex
CREATE INDEX "menu_items_restaurant_id_menu_id_idx" ON "menu_items"("restaurant_id", "menu_id");

-- CreateIndex
CREATE INDEX "menu_items_restaurant_id_active_idx" ON "menu_items"("restaurant_id", "active");

-- CreateIndex
CREATE INDEX "menu_items_restaurant_id_visible_idx" ON "menu_items"("restaurant_id", "visible");

-- CreateIndex
CREATE INDEX "menu_items_recipe_id_idx" ON "menu_items"("recipe_id");

-- CreateIndex
CREATE INDEX "menu_items_category_id_idx" ON "menu_items"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "menu_items_restaurant_id_menu_id_name_key" ON "menu_items"("restaurant_id", "menu_id", "name");

-- CreateIndex
CREATE INDEX "combos_restaurant_id_idx" ON "combos"("restaurant_id");

-- CreateIndex
CREATE INDEX "combos_restaurant_id_active_idx" ON "combos"("restaurant_id", "active");

-- CreateIndex
CREATE UNIQUE INDEX "combos_restaurant_id_name_key" ON "combos"("restaurant_id", "name");

-- CreateIndex
CREATE INDEX "combo_items_restaurant_id_combo_id_idx" ON "combo_items"("restaurant_id", "combo_id");

-- CreateIndex
CREATE INDEX "combo_items_menu_item_id_idx" ON "combo_items"("menu_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "combo_items_restaurant_id_combo_id_menu_item_id_key" ON "combo_items"("restaurant_id", "combo_id", "menu_item_id");

-- CreateIndex
CREATE INDEX "sales_restaurant_id_idx" ON "sales"("restaurant_id");

-- CreateIndex
CREATE INDEX "sales_restaurant_id_created_at_idx" ON "sales"("restaurant_id", "created_at");

-- CreateIndex
CREATE INDEX "sales_restaurant_id_status_idx" ON "sales"("restaurant_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "sales_restaurant_id_sale_number_key" ON "sales"("restaurant_id", "sale_number");

-- CreateIndex
CREATE INDEX "sale_items_restaurant_id_sale_id_idx" ON "sale_items"("restaurant_id", "sale_id");

-- CreateIndex
CREATE INDEX "sale_items_menu_item_id_idx" ON "sale_items"("menu_item_id");

-- CreateIndex
CREATE INDEX "sale_items_combo_id_idx" ON "sale_items"("combo_id");

-- CreateIndex
CREATE INDEX "sale_items_restaurant_id_created_at_idx" ON "sale_items"("restaurant_id", "created_at");

-- CreateIndex
CREATE INDEX "itens_pedido_restaurant_id_pedido_id_idx" ON "itens_pedido"("restaurant_id", "pedido_id");

-- CreateIndex
CREATE INDEX "itens_pedido_item_cardapio_id_idx" ON "itens_pedido"("item_cardapio_id");

-- CreateIndex
CREATE INDEX "caixa_restaurant_id_idx" ON "caixa"("restaurant_id");

-- CreateIndex
CREATE INDEX "caixa_restaurant_id_status_idx" ON "caixa"("restaurant_id", "status");

-- CreateIndex
CREATE INDEX "caixa_restaurant_id_data_abertura_idx" ON "caixa"("restaurant_id", "data_abertura");

-- CreateIndex
CREATE INDEX "categorias_financeiras_restaurant_id_idx" ON "categorias_financeiras"("restaurant_id");

-- CreateIndex
CREATE INDEX "categorias_financeiras_restaurant_id_tipo_idx" ON "categorias_financeiras"("restaurant_id", "tipo");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_financeiras_restaurant_id_nome_tipo_key" ON "categorias_financeiras"("restaurant_id", "nome", "tipo");

-- CreateIndex
CREATE INDEX "categories_restaurant_id_idx" ON "categories"("restaurant_id");

-- CreateIndex
CREATE INDEX "categories_restaurant_id_active_idx" ON "categories"("restaurant_id", "active");

-- CreateIndex
CREATE UNIQUE INDEX "categories_restaurant_id_name_key" ON "categories"("restaurant_id", "name");

-- CreateIndex
CREATE INDEX "despesas_restaurant_id_idx" ON "despesas"("restaurant_id");

-- CreateIndex
CREATE INDEX "despesas_restaurant_id_data_despesa_idx" ON "despesas"("restaurant_id", "data_despesa");

-- CreateIndex
CREATE INDEX "despesas_restaurant_id_categoria_id_idx" ON "despesas"("restaurant_id", "categoria_id");

-- CreateIndex
CREATE INDEX "despesas_caixa_id_idx" ON "despesas"("caixa_id");

-- CreateIndex
CREATE INDEX "ingredients_restaurant_id_idx" ON "ingredients"("restaurant_id");

-- CreateIndex
CREATE INDEX "ingredients_restaurant_id_active_idx" ON "ingredients"("restaurant_id", "active");

-- CreateIndex
CREATE INDEX "ingredients_restaurant_id_name_idx" ON "ingredients"("restaurant_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_restaurant_id_name_key" ON "ingredients"("restaurant_id", "name");

-- CreateIndex
CREATE INDEX "menus_restaurant_id_active_idx" ON "menus"("restaurant_id", "active");

-- CreateIndex
CREATE UNIQUE INDEX "menus_restaurant_id_name_key" ON "menus"("restaurant_id", "name");

-- CreateIndex
CREATE INDEX "pedidos_restaurant_id_idx" ON "pedidos"("restaurant_id");

-- CreateIndex
CREATE INDEX "pedidos_restaurant_id_status_idx" ON "pedidos"("restaurant_id", "status");

-- CreateIndex
CREATE INDEX "pedidos_restaurant_id_created_at_idx" ON "pedidos"("restaurant_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_restaurant_id_numero_pedido_key" ON "pedidos"("restaurant_id", "numero_pedido");

-- CreateIndex
CREATE INDEX "receitas_restaurant_id_idx" ON "receitas"("restaurant_id");

-- CreateIndex
CREATE INDEX "receitas_restaurant_id_data_receita_idx" ON "receitas"("restaurant_id", "data_receita");

-- CreateIndex
CREATE INDEX "receitas_restaurant_id_categoria_id_idx" ON "receitas"("restaurant_id", "categoria_id");

-- CreateIndex
CREATE INDEX "receitas_caixa_id_idx" ON "receitas"("caixa_id");

-- CreateIndex
CREATE INDEX "receitas_pedido_id_idx" ON "receitas"("pedido_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_cnpj_key" ON "restaurants"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE INDEX "users_restaurant_id_idx" ON "users"("restaurant_id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_google_id_idx" ON "users"("google_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_prices" ADD CONSTRAINT "ingredient_prices_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_prices" ADD CONSTRAINT "ingredient_prices_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combos" ADD CONSTRAINT "combos_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combo_items" ADD CONSTRAINT "combo_items_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combo_items" ADD CONSTRAINT "combo_items_combo_id_fkey" FOREIGN KEY ("combo_id") REFERENCES "combos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combo_items" ADD CONSTRAINT "combo_items_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_items" ADD CONSTRAINT "sale_items_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_items" ADD CONSTRAINT "sale_items_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_items" ADD CONSTRAINT "sale_items_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_items" ADD CONSTRAINT "sale_items_combo_id_fkey" FOREIGN KEY ("combo_id") REFERENCES "combos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caixa" ADD CONSTRAINT "caixa_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias_financeiras" ADD CONSTRAINT "categorias_financeiras_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_pedido" ADD CONSTRAINT "itens_pedido_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_pedido" ADD CONSTRAINT "itens_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("pedido_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_pedido" ADD CONSTRAINT "itens_pedido_item_cardapio_id_fkey" FOREIGN KEY ("item_cardapio_id") REFERENCES "menu_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "restaurant_id_idx" RENAME TO "menus_restaurant_id_idx";
