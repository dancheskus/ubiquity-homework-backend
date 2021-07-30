/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `TodoList` table. All the data in the column will be lost.
  - Added the required column `workSpaceId` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_workspaceId_fkey";

-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "workspaceId",
ADD COLUMN     "workSpaceId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "TodoList" ADD FOREIGN KEY ("workSpaceId") REFERENCES "WorkSpace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
