/*
  Warnings:

  - You are about to drop the column `authorId` on the `WorkSpace` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `WorkSpace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shared` to the `WorkSpace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkSpace" DROP CONSTRAINT "WorkSpace_authorId_fkey";

-- AlterTable
ALTER TABLE "WorkSpace" DROP COLUMN "authorId",
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "shared" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "TodoList" (
    "id" TEXT NOT NULL,
    "locked" BOOLEAN NOT NULL,
    "workspaceId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TodoItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "todoListId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TodoList" ADD FOREIGN KEY ("workspaceId") REFERENCES "WorkSpace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoItem" ADD FOREIGN KEY ("todoListId") REFERENCES "TodoList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSpace" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
