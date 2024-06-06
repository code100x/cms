-- CreateTable
CREATE TABLE "DiscordConnectBulk" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DiscordConnectBulk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordConnectBulk_discordId_key" ON "DiscordConnectBulk"("discordId");
