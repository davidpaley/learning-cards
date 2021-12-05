/*
  Warnings:

  - Added the required column `level` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextReviewDate` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userEmail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Deck_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Deck" ("id", "name", "userEmail") SELECT "id", "name", "userEmail" FROM "Deck";
DROP TABLE "Deck";
ALTER TABLE "new_Deck" RENAME TO "Deck";
CREATE UNIQUE INDEX "Deck_userEmail_name_key" ON "Deck"("userEmail", "name");
CREATE TABLE "new_Cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextReviewDate" DATETIME NOT NULL,
    "level" INTEGER NOT NULL,
    CONSTRAINT "Cards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cards" ("answer", "deckId", "id", "question") SELECT "answer", "deckId", "id", "question" FROM "Cards";
DROP TABLE "Cards";
ALTER TABLE "new_Cards" RENAME TO "Cards";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
