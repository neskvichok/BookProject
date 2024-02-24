/*
  Warnings:

  - You are about to drop the column `bookRecordId` on the `ReadingSession` table. All the data in the column will be lost.
  - Added the required column `bookId` to the `ReadingSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ReadingSession` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReadingSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" DATETIME NOT NULL,
    "startPage" INTEGER NOT NULL,
    "endTime" DATETIME,
    "endPage" INTEGER,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    CONSTRAINT "ReadingSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReadingSession_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReadingSession" ("endPage", "endTime", "id", "startPage", "startTime") SELECT "endPage", "endTime", "id", "startPage", "startTime" FROM "ReadingSession";
DROP TABLE "ReadingSession";
ALTER TABLE "new_ReadingSession" RENAME TO "ReadingSession";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
