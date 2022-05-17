import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { DeckResponse } from "../../src/types";
const prisma = new PrismaClient();

export interface ResponseData {
  isNotLogged: boolean;
  data?: DeckResponse | DeckResponse[];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(200).json({ isNotLogged: true });
  }
  if (req.method === "POST") {
    const deck = JSON.parse(req.body);
    const saveDeck = await prisma.deck.create({
      data: deck,
    });
    res.status(200).json({ data: saveDeck, isNotLogged: false });
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
          id: true,
        },
      });
      res.status(200).json({ data: deck, isNotLogged: false });
      return;
    }
    const foundDesks = await prisma.deck.findMany({
      select: {
        name: true,
        cards: true,
      },
    });
    res.status(200).json({
      data: foundDesks,
      isNotLogged: false,
    });
    return;
  } else if (req.method === "DELETE") {
    const deck = JSON.parse(req.body);
    const deleteDeck = await prisma.deck.delete({
      where: {
        id: deck.id as string,
      },
    });
    res.status(200).json({ data: deleteDeck, isNotLogged: false });
    return;
  }
  return res.status(405).json({ message: "Method not allowed" } as any);
};
