/*
  Warnings:

  - You are about to drop the column `link` on the `Book` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "description" TEXT,
    "name" TEXT NOT NULL,
    "coverlink" TEXT,
    "author" TEXT NOT NULL,
    "pageNum" INTEGER NOT NULL,
    "isbn" TEXT NOT NULL,
    "rate" REAL NOT NULL DEFAULT 5
);
INSERT INTO "new_Book" ("author", "coverlink", "createdAt", "description", "id", "isbn", "name", "pageNum", "rate", "updatedAt") SELECT "author", "coverlink", "createdAt", "description", "id", "isbn", "name", "pageNum", "rate", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
