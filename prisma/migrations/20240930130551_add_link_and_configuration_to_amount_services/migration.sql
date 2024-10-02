/*
  Warnings:

  - Added the required column `link` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showAmountServices` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "showAmountServices" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_companies" ("address", "created_at", "id", "name") SELECT "address", "created_at", "id", "name" FROM "companies";
DROP TABLE "companies";
ALTER TABLE "new_companies" RENAME TO "companies";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
