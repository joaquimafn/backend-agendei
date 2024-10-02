/*
  Warnings:

  - Added the required column `companyId` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "isMarkedToUse" BOOLEAN NOT NULL,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "schedules_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_schedules" ("date", "hour", "id", "isMarkedToUse") SELECT "date", "hour", "id", "isMarkedToUse" FROM "schedules";
DROP TABLE "schedules";
ALTER TABLE "new_schedules" RENAME TO "schedules";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
