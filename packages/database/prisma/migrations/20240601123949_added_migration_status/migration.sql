-- CreateEnum
CREATE TYPE "MigrationStatus" AS ENUM ('NOT_MIGRATED', 'IN_PROGRESS', 'MIGRATED', 'MIGRATION_ERROR');

-- AlterTable
ALTER TABLE "VideoMetadata" ADD COLUMN     "migration_pickup_time" TIMESTAMP(3),
ADD COLUMN     "migration_status" "MigrationStatus" NOT NULL DEFAULT 'NOT_MIGRATED';
