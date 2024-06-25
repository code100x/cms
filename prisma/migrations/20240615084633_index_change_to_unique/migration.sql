/*
  Warnings:

  - A unique constraint covering the columns `[email,token]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PasswordResetToken_email_token_idx";

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");
