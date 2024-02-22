-- AlterTable
ALTER TABLE "Book" ADD COLUMN "description" TEXT;

-- CreateTable
CREATE TABLE "BookRecords" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "type" TEXT,
    "rating" INTEGER,
    CONSTRAINT "BookRecords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookRecords_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BookRecords_bookId_userId_key" ON "BookRecords"("bookId", "userId");
