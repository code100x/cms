/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PasswordResetToken_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");
