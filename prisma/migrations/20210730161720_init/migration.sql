/*
  Warnings:

  - You are about to drop the column `completed` on the `TodoItem` table. All the data in the column will be lost.
  - You are about to drop the column `locked` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the column `shared` on the `WorkSpace` table. All the data in the column will be lost.
  - Added the required column `isCompleted` to the `TodoItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isLocked` to the `TodoList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isShared` to the `WorkSpace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TodoItem" DROP COLUMN "completed",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "locked",
ADD COLUMN     "isLocked" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "WorkSpace" DROP COLUMN "shared",
ADD COLUMN     "isShared" BOOLEAN NOT NULL;
