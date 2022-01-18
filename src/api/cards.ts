export type CreateOrUpdateCard = {
  answer: string;
  question: string;
  nextReviewDate?: Date;
  deckId?: string;
  level?: number;
  id?: string;
};
const URL = "/api/cards";

export const createOrUpdateCard = (body: CreateOrUpdateCard) =>
  fetch(URL, {
    method: "POST",
    body: JSON.stringify(body),
  });
