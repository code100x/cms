-- CreateTable
CREATE TABLE "GithubUser" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "publicName" TEXT,
    "isLinked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GithubUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BountyInfo" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "PR_Link" TEXT NOT NULL,
    "PR_Title" TEXT NOT NULL,
    "repoName" TEXT NOT NULL,
    "USD_amount" INTEGER NOT NULL,
    "INR_amount" INTEGER NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "githubUserId" TEXT,

    CONSTRAINT "BountyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubUser_userId_key" ON "GithubUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GithubUser_username_key" ON "GithubUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "GithubUser_email_key" ON "GithubUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BountyInfo_PR_Link_key" ON "BountyInfo"("PR_Link");

-- AddForeignKey
ALTER TABLE "GithubUser" ADD CONSTRAINT "GithubUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyInfo" ADD CONSTRAINT "BountyInfo_githubUserId_fkey" FOREIGN KEY ("githubUserId") REFERENCES "GithubUser"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
