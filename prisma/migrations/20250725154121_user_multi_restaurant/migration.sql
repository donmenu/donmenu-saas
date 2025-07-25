/*
  Warnings:

  - You are about to drop the column `restaurant_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_restaurant_id_fkey";

-- DropIndex
DROP INDEX IF EXISTS "users_restaurant_id_idx";

-- 1. Adicionar userId como opcional
ALTER TABLE "restaurants" ADD COLUMN "userId" INTEGER;

-- 2. Preencher userId para restaurantes existentes (usando o primeiro usuário)
UPDATE "restaurants" SET "userId" = (SELECT id FROM "users" LIMIT 1) WHERE "userId" IS NULL;

-- 3. Tornar userId obrigatório
ALTER TABLE "restaurants" ALTER COLUMN "userId" SET NOT NULL;

-- 4. Remover o campo restaurant_id de users
ALTER TABLE "users" DROP COLUMN IF EXISTS "restaurant_id";

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
