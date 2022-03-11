import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Card } from "@prisma/client";
const prisma = new PrismaClient();

type NewCard = {
  selectedCard?: Card;
  answer?: string;
  question?: string;
  level?: number;
  nextReviewDate?: Date;
  status?: boolean;
};

export default async (req: NextApiRequest, res: NextApiResponse<Card>) => {
  if (req.method === "POST") {
    const newCard: NewCard = JSON.parse(req.body);
    const { selectedCard, answer, question, level, nextReviewDate, status } =
      newCard;
    const saveCard = await prisma.card.upsert({
      where: {
        id: selectedCard?.id || "-1",
      },
      update: {
        answer: !!answer ? answer : undefined,
        question: !!question ? question : undefined,
        level: !!level ? level : undefined,
        status: !!status ? status : false,
        nextReviewDate: !!nextReviewDate ? nextReviewDate : undefined,
      },
      create: {
        question: !!question ? question : selectedCard.question,
        answer: !!answer ? answer : selectedCard.answer,
        nextReviewDate: selectedCard.nextReviewDate,
        deckId: selectedCard.deckId,
        level: selectedCard.level,
        status: false,
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
