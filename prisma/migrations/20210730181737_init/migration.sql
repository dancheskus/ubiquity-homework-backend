/*
  Warnings:

  - You are about to drop the column `workSpaceId` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the `WorkSpace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workspaceId` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_workSpaceId_fkey";

-- DropForeignKey
ALTER TABLE "WorkSpace" DROP CONSTRAINT "WorkSpace_ownerId_fkey";

-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "workSpaceId",
ADD COLUMN     "workspaceId" UUID NOT NULL;

-- DropTable
DROP TABLE "WorkSpace";

-- CreateTable
CREATE TABLE "Workspace" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "isShared" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TodoList" ADD FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
