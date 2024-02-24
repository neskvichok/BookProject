-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReadingSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" DATETIME NOT NULL,
    "startPage" INTEGER NOT NULL,
    "endTime" DATETIME,
    "endPage" INTEGER,
    "bookRecordId" INTEGER NOT NULL,
    CONSTRAINT "ReadingSession_bookRecordId_fkey" FOREIGN KEY ("bookRecordId") REFERENCES "BookRecords" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReadingSession" ("bookRecordId", "endPage", "endTime", "id", "startPage", "startTime") SELECT "bookRecordId", "endPage", "endTime", "id", "startPage", "startTime" FROM "ReadingSession";
DROP TABLE "ReadingSession";
ALTER TABLE "new_ReadingSession" RENAME TO "ReadingSession";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
