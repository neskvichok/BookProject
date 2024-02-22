-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "pageNum" INTEGER NOT NULL,
    "isbn" TEXT NOT NULL,
    "rate" REAL NOT NULL DEFAULT 5
);
INSERT INTO "new_Book" ("author", "createdAt", "id", "isbn", "name", "pageNum", "rate", "updatedAt") SELECT "author", "createdAt", "id", "isbn", "name", "pageNum", "rate", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
