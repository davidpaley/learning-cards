import { DeckResponse } from "../types";

type CreateDeck = {
  name: string;
  classId: string;
  isUpdate?: boolean;
};

export type DeleteDeck = {
  id: string;
  classId: string;
  name: string;
};

const URL = "/api/decks";

export const createOrUpdateDeck = (body: CreateDeck) => {
  return fetch(URL, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const getDecks = async (): Promise<{ data: DeckResponse[] }> => {
  const response = await fetch(URL);
  const decks = await response.json();
  return decks;
};

export const getDeck = async (
  deckId: string
): Promise<{ data: DeckResponse }> => {
  const response = await fetch(`${URL}?id=${deckId}`);
  const deck = await response.json();
  return deck;
};

export const deleteDeck = (body: DeleteDeck) =>
  fetch(URL, {
    method: "DELETE",
    body: JSON.stringify(body),
  });
