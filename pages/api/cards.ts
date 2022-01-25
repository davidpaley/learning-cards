import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Card } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse<Card>) => {
  if (req.method === "POST") {
    const newCard = JSON.parse(req.body);
    const { selectedCard, answer, question } = newCard;
    const saveCard = await prisma.card.upsert({
      where: {
        id: selectedCard?.id || "-1",
      },
      update: {
        answer: answer,
        question: question,
      },
      create: {
        question: question,
        answer: answer,
        nextReviewDate: selectedCard.nextReviewDate,
        deckId: selectedCard.deckId,
        level: selectedCard.level,
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
