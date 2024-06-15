-- DropIndex
DROP INDEX "PasswordResetToken_email_token_key";

-- CreateIndex
CREATE INDEX "PasswordResetToken_email_token_idx" ON "PasswordResetToken"("email", "token");
