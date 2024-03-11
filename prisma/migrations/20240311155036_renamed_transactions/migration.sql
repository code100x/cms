/*
  Warnings:

  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_purchasedById_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_purchasedCourseId_fkey";

-- DropTable
DROP TABLE "Transaction";

-- CreateTable
CREATE TABLE "TransactionForCourse" (
    "id" TEXT NOT NULL,
    "razorpay_paymet_id" TEXT NOT NULL,
    "razorpay_order_id" TEXT NOT NULL,
    "razorpay_signature" TEXT NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentVerified" BOOLEAN NOT NULL DEFAULT false,
    "purchasedCourseId" INTEGER NOT NULL,
    "purchasedById" TEXT NOT NULL,

    CONSTRAINT "TransactionForCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionForCourse_razorpay_paymet_id_key" ON "TransactionForCourse"("razorpay_paymet_id");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionForCourse_razorpay_order_id_key" ON "TransactionForCourse"("razorpay_order_id");

-- AddForeignKey
ALTER TABLE "TransactionForCourse" ADD CONSTRAINT "TransactionForCourse_purchasedCourseId_fkey" FOREIGN KEY ("purchasedCourseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionForCourse" ADD CONSTRAINT "TransactionForCourse_purchasedById_fkey" FOREIGN KEY ("purchasedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
