-- AlterTable
ALTER TABLE "TodoItem" ALTER COLUMN "isCompleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "TodoList" ALTER COLUMN "isLocked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "WorkSpace" ALTER COLUMN "isShared" SET DEFAULT false;
