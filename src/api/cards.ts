export type CreateOrUpdateCard = {
  answer: string;
  question: string;
  nextReviewDate?: Date;
  deckId?: string;
  level?: number;
  id?: string;
  isDone?: boolean;
};

export type DeleteCard = {
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

export const deleteCard = (body: DeleteCard) =>
  fetch(URL, {
    method: "DELETE",
    body: JSON.stringify(body),
  });
