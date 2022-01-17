type CreateDeck = {
  name: String;
  classId: String;
};

const URL = "/api/decks";

export const createDeck = (body: CreateDeck) =>
  fetch(URL, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const getDecks = async () => {
  const response = await fetch(URL);
  const decks = await response.json();
  return decks;
};

export const getDeck = async (deckId: string) => {
  const response = await fetch(`${URL}?id=${deckId}`);
  const deck = await response.json();
  return deck;
};
