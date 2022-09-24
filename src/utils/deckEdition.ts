import { DeckResponse } from "../types";

export const getDeckWithSortedCards = (deck: DeckResponse) => ({
  ...deck,
  cards: deck.cards.sort(
    (a, b) =>
      new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
  ),
});
