/*
  Warnings:

  - A unique constraint covering the columns `[tournamentId]` on the table `History` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "History_tournamentId_key" ON "History"("tournamentId");
