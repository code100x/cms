-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "discordRoleId" DROP NOT NULL;