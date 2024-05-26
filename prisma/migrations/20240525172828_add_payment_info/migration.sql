-- CreateTable
CREATE TABLE "PaymentInfo" (
    "id" TEXT NOT NULL,
    "upiId" TEXT NOT NULL,
    "qrCodeImage" TEXT NOT NULL,
    "accountName" TEXT,
    "accountNumber" TEXT,
    "ifscCode" TEXT,
    "panNumber" TEXT,
    "panCardPdf" TEXT,
    "githubUserId" TEXT NOT NULL,

    CONSTRAINT "PaymentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfo_upiId_key" ON "PaymentInfo"("upiId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfo_accountNumber_key" ON "PaymentInfo"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfo_panNumber_key" ON "PaymentInfo"("panNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfo_githubUserId_key" ON "PaymentInfo"("githubUserId");

-- AddForeignKey
ALTER TABLE "PaymentInfo" ADD CONSTRAINT "PaymentInfo_githubUserId_fkey" FOREIGN KEY ("githubUserId") REFERENCES "GithubUser"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
