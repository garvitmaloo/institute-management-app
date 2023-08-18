-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_batch_incharge_id_fkey";

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "batch_incharge_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_batch_incharge_id_fkey" FOREIGN KEY ("batch_incharge_id") REFERENCES "Batch"("batch_id") ON DELETE SET NULL ON UPDATE CASCADE;
