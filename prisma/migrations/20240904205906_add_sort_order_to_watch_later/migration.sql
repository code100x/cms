-- Step 1: Add the sortOrder column with a default value of 0 for existing rows
ALTER TABLE "WatchLater" ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- Step 2: Optionally update the sortOrder for existing rows based on some logic, like createdAt
-- UPDATE "WatchLater" SET "sortOrder" = ROW_NUMBER() OVER (ORDER BY "createdAt");

-- Step 3: Remove the default value to prevent future rows from having a default sortOrder
ALTER TABLE "WatchLater" ALTER COLUMN "sortOrder" DROP DEFAULT;
