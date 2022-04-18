import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import { Card } from "@prisma/client";
const prisma = new PrismaClient();

type NewCard = Partial<Card>;

interface CustomReq extends NextApiRequest {
  session: { user: User };
}

export default async (
  req: CustomReq,
  res: NextApiResponse<Card | { login: boolean }>
) => {
  // TODO: Check user logged
  if (!req.session.user) {
    res.status(200).json({ login: false });
    return;
  }
  // in a real world application you might read the user id from the session and then do a database request
  // to get more information on the user if needed
  if (req.method === "POST") {
    const newCard: NewCard = JSON.parse(req.body);
    const { answer, question, level, nextReviewDate, isDone, id, deckId } =
      newCard;
    const saveCard = await prisma.card.upsert({
      where: {
        id: id || "-1",
      },
      update: {
        answer: !!answer ? answer : undefined,
        question: !!question ? question : undefined,
        level: !!level ? level : undefined,
        isDone: !!isDone ? isDone : false,
        nextReviewDate: !!nextReviewDate ? nextReviewDate : undefined,
      },
      create: {
        question,
        answer,
        nextReviewDate: nextReviewDate || new Date(),
        deckId,
        level: level || 1,
        isDone: false,
      },
    });
    res.status(200).json(saveCard);
    return;
  } else if (req.method === "GET") {
    const { id } = req.query;
    const card = await prisma.card.findUnique({
      where: {
        id: id as string,
      },
    });
    res.status(200).json(card);
    return;
  } else if (req.method === "DELETE") {
    const cardId = JSON.parse(req.body);
    const deleteCard = await prisma.card.delete({
      where: {
        id: cardId as string,
      },
    });
    res.status(200).json(deleteCard);
    return;
  }
  return res.status(405).json({ message: "Method not allowed" } as any);
};
