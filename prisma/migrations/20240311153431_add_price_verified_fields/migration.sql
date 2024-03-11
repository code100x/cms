-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 500;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "razorpay_paymet_id" TEXT NOT NULL,
    "razorpay_order_id" TEXT NOT NULL,
    "razorpay_signature" TEXT NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentVerified" BOOLEAN NOT NULL DEFAULT false,
    "purchasedCourseId" INTEGER NOT NULL,
    "purchasedById" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_razorpay_paymet_id_key" ON "Transaction"("razorpay_paymet_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_razorpay_order_id_key" ON "Transaction"("razorpay_order_id");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_purchasedCourseId_fkey" FOREIGN KEY ("purchasedCourseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_purchasedById_fkey" FOREIGN KEY ("purchasedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
