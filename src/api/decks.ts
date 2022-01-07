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

export const getDecks = () => fetch(URL);
