-- CreateTable
CREATE TABLE "DiscordConnect" (
    "id" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inviteLink" TEXT NOT NULL,

    CONSTRAINT "DiscordConnect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordConnect_discordId_key" ON "DiscordConnect"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordConnect_userId_key" ON "DiscordConnect"("userId");

-- AddForeignKey
ALTER TABLE "DiscordConnect" ADD CONSTRAINT "DiscordConnect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
