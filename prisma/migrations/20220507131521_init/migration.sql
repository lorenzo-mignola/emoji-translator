-- CreateTable
CREATE TABLE "User" (
    "apikey" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalText" TEXT NOT NULL,
    "translatedText" TEXT NOT NULL,
    "userApikey" TEXT NOT NULL,
    CONSTRAINT "Translation_userApikey_fkey" FOREIGN KEY ("userApikey") REFERENCES "User" ("apikey") ON DELETE RESTRICT ON UPDATE CASCADE
);
