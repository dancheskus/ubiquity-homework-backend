/*
  Warnings:

  - Made the column `isCompleted` on table `TodoItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isLocked` on table `TodoList` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isShared` on table `WorkSpace` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TodoItem" ALTER COLUMN "isCompleted" SET NOT NULL;

-- AlterTable
ALTER TABLE "TodoList" ALTER COLUMN "isLocked" SET NOT NULL;

-- AlterTable
ALTER TABLE "WorkSpace" ALTER COLUMN "isShared" SET NOT NULL;
