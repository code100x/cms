-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('INTRO', 'DEFAULT');

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "appxCourseId" INTEGER NOT NULL,
    "discordRoleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "openToEveryone" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPurchases" (
    "userId" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPurchases_pkey" PRIMARY KEY ("userId","courseId")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'folder',
    "title" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "thumbnail" TEXT,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notionMetadataId" INTEGER,
    "commentsCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseContent" (
    "courseId" INTEGER NOT NULL,
    "contentId" INTEGER NOT NULL,

    CONSTRAINT "CourseContent_pkey" PRIMARY KEY ("courseId","contentId")
);

-- CreateTable
CREATE TABLE "NotionMetadata" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "notionId" TEXT NOT NULL,

    CONSTRAINT "NotionMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoMetadata" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "video_1080p_mp4_1" TEXT,
    "video_1080p_mp4_2" TEXT,
    "video_1080p_mp4_3" TEXT,
    "video_1080p_mp4_4" TEXT,
    "video_1080p_1" TEXT,
    "video_1080p_2" TEXT,
    "video_1080p_3" TEXT,
    "video_1080p_4" TEXT,
    "video_720p_mp4_1" TEXT,
    "video_720p_mp4_2" TEXT,
    "video_720p_mp4_3" TEXT,
    "video_720p_mp4_4" TEXT,
    "video_720p_1" TEXT,
    "video_720p_2" TEXT,
    "video_720p_3" TEXT,
    "video_720p_4" TEXT,
    "video_360p_mp4_1" TEXT,
    "video_360p_mp4_2" TEXT,
    "video_360p_mp4_3" TEXT,
    "video_360p_mp4_4" TEXT,
    "video_360p_1" TEXT,
    "video_360p_2" TEXT,
    "video_360p_3" TEXT,
    "video_360p_4" TEXT,
    "subtitles" TEXT,
    "segments" JSONB,
    "slides" TEXT,
    "thumbnail_mosiac_url" TEXT,
    "duration" INTEGER,

    CONSTRAINT "VideoMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "token" TEXT,
    "disableDrm" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "appxUserId" TEXT,
    "appxUsername" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordConnect" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DiscordConnect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordConnectBulk" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DiscordConnectBulk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookmarkVideoTimestamp" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "BookmarkVideoTimestamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,
    "currentTimestamp" INTEGER NOT NULL,
    "markAsCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VideoProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "commentType" "CommentType" NOT NULL DEFAULT 'DEFAULT',
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "contentId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "userId" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "repliesCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "voteType" "VoteType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotionMetadata_contentId_key" ON "NotionMetadata"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoMetadata_contentId_key" ON "VideoMetadata"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordConnect_discordId_key" ON "DiscordConnect"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordConnect_userId_key" ON "DiscordConnect"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoProgress_contentId_userId_key" ON "VideoProgress"("contentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_commentId_userId_key" ON "Vote"("commentId", "userId");

-- AddForeignKey
ALTER TABLE "UserPurchases" ADD CONSTRAINT "UserPurchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPurchases" ADD CONSTRAINT "UserPurchases_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotionMetadata" ADD CONSTRAINT "NotionMetadata_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoMetadata" ADD CONSTRAINT "VideoMetadata_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscordConnect" ADD CONSTRAINT "DiscordConnect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkVideoTimestamp" ADD CONSTRAINT "BookmarkVideoTimestamp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkVideoTimestamp" ADD CONSTRAINT "BookmarkVideoTimestamp_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoProgress" ADD CONSTRAINT "VideoProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoProgress" ADD CONSTRAINT "VideoProgress_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
