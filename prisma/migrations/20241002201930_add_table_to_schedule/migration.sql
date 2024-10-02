-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "isMarkedToUse" BOOLEAN NOT NULL
);
