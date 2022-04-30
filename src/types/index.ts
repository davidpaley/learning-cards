import { ClassForDecks, Deck } from "@prisma/client";

export interface ClassType extends ClassForDecks {
  decks: Deck[];
}
