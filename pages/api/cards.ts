import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Card } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse<Card>) => {
  if (req.method === "POST") {
    const newCard = JSON.parse(req.body);
    const saveCard = await prisma.card.upsert({
      where: {
        id: newCard.selectedCard?.id || "-1",
      },
      update: {
        answer: newCard.answer,
        question: newCard.question,
      },
      create: {
        question: newCard.question,
        answer: newCard.answer,
        nextReviewDate: newCard.selectedCard.nextReviewDate,
        deckId: newCard.selectedCard.deckId,
        level: newCard.selectedCard.level,
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
  }
  return res.status(405).json({ message: "Method not allowed" } as any);
};
