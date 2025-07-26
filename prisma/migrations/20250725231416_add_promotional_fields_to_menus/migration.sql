-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "discount_percentage" DECIMAL(5,2),
ADD COLUMN     "image_url" VARCHAR(500),
ADD COLUMN     "is_promotional" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "valid_from" TIMESTAMP(3),
ADD COLUMN     "valid_to" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "menus_restaurant_id_is_promotional_idx" ON "menus"("restaurant_id", "is_promotional");
