import { Card, ClassForDecks, Deck } from "@prisma/client";

export interface CardForm {
  question: string;
  answer: string;
}

export interface CustomClass
  extends Omit<ClassForDecks, "userEmail" | "creationDate"> {
  decks?: Deck[];
}

export interface DeckResponse
  extends Omit<Deck, "id" | "classId" | "creationDate" | "name"> {
  cards?: Card[];
  name?: string;
  id?: string;
}
