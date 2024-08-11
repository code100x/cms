-- CreateTable
CREATE TABLE "UPIWallet" (
    "id" SERIAL NOT NULL,
    "parentId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UPIWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolanaWallet" (
    "id" SERIAL NOT NULL,
    "parentId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SolanaWallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UPIWallet" ADD CONSTRAINT "UPIWallet_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolanaWallet" ADD CONSTRAINT "SolanaWallet_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
