-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL,
    "pokemonEntry" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_teamId_key" ON "Pokemon"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_userId_key" ON "Team"("userId");

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
