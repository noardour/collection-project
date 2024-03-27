/*
  Warnings:

  - The values [MONETS] on the enum `CollectionCategories` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updated_at` to the `collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CollectionCategories_new" AS ENUM ('MOVEIS', 'MUSICAL_ALBUMS', 'BOOKS', 'PAINTINGS', 'CARS', 'COINS', 'OTHER');
ALTER TABLE "collections" ALTER COLUMN "category" TYPE "CollectionCategories_new" USING ("category"::text::"CollectionCategories_new");
ALTER TYPE "CollectionCategories" RENAME TO "CollectionCategories_old";
ALTER TYPE "CollectionCategories_new" RENAME TO "CollectionCategories";
DROP TYPE "CollectionCategories_old";
COMMIT;

-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
