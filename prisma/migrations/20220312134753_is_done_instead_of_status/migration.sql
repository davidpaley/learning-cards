/*
  Warnings:

  - You are about to drop the column `status` on the `Card` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "videoQuestion" TEXT,
    "videoAnswer" TEXT,
    "imageQuestion" TEXT,
    "imageAnswer" TEXT,
    "deckId" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextReviewDate" DATETIME NOT NULL,
    "level" INTEGER NOT NULL,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("answer", "creationDate", "deckId", "id", "imageAnswer", "imageQuestion", "level", "nextReviewDate", "question", "videoAnswer", "videoQuestion") SELECT "answer", "creationDate", "deckId", "id", "imageAnswer", "imageQuestion", "level", "nextReviewDate", "question", "videoAnswer", "videoQuestion" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE UNIQUE INDEX "Card_id_key" ON "Card"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
