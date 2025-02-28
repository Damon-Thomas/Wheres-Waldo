-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT NOT NULL,
    "endTime" TEXT,
    "foundArray" BOOLEAN[] DEFAULT ARRAY[false, false, false]::BOOLEAN[],

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopGames" (
    "id" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "place" TEXT NOT NULL,

    CONSTRAINT "TopGames_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Games_clientId_key" ON "Games"("clientId");
