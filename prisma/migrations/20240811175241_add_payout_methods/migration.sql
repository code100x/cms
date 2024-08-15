-- CreateTable
CREATE TABLE "UpiId" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(256) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UpiId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolanaAddress" (
    "id" SERIAL NOT NULL,
    "value" CHAR(44) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SolanaAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UpiId_userId_value_key" ON "UpiId"("userId", "value");

-- CreateIndex
CREATE UNIQUE INDEX "SolanaAddress_userId_value_key" ON "SolanaAddress"("userId", "value");

-- AddForeignKey
ALTER TABLE "UpiId" ADD CONSTRAINT "UpiId_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolanaAddress" ADD CONSTRAINT "SolanaAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
