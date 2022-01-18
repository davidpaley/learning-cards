import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Card } from "@prisma/client";
const prisma = new PrismaClient();

type DeckData = {
  name: string;
  cards?: Card[];
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<DeckData | DeckData[]>
) => {
  if (req.method === "POST") {
    const deck = JSON.parse(req.body);
    const saveDeck = await prisma.deck.create({
      data: deck,
    });
    res.status(200).json([saveDeck]);
    return;
  } else if (req.method === "GET") {
    const { id } = req.query;
    if (!!id) {
      const deck = await prisma.deck.findUnique({
        where: {
          id: id as string,
        },
        select: {
          cards: true,
          name: true,
          classOfDeck: true,
        },
      });
      res.status(200).json(deck);
      return;
    }
    const foundDesks = await prisma.deck.findMany({
      select: {
        name: true,
        cards: true,
      },
    });
    res.status(200).json(foundDesks);
    return;
  }
  return res.status(405).json({ message: "Method not allowed" } as any);
};
