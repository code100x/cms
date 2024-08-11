/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `SolanaWallet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `UPIWallet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SolanaWallet_address_key" ON "SolanaWallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "UPIWallet_address_key" ON "UPIWallet"("address");
