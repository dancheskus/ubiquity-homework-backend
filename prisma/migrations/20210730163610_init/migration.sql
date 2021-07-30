-- AlterTable
ALTER TABLE "TodoItem" ALTER COLUMN "isCompleted" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TodoList" ALTER COLUMN "isLocked" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WorkSpace" ALTER COLUMN "isShared" DROP NOT NULL;
