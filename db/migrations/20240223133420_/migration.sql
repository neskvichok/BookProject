/*
  Warnings:

  - You are about to drop the column `type` on the `BookRecords` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BookRecords" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "rating" INTEGER,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "BookRecords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookRecords_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BookRecords" ("bookId", "id", "rating", "userId") SELECT "bookId", "id", "rating", "userId" FROM "BookRecords";
DROP TABLE "BookRecords";
ALTER TABLE "new_BookRecords" RENAME TO "BookRecords";
CREATE UNIQUE INDEX "BookRecords_bookId_userId_key" ON "BookRecords"("bookId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
