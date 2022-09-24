import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { DeckResponse } from "../../src/types";
import executeRequest from "../../src/utils/api";
const prisma = new PrismaClient();

export interface Response {
  data?: DeckResponse | DeckResponse[];
}

const postRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const deck = JSON.parse(req.body);
  const saveDeck = await prisma.deck.create({
    data: deck,
  });
  res.status(201).json({ data: saveDeck });
};

const getRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
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
    res.status(200).json({ data: deck });
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
  });
};

const deleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const deck = JSON.parse(req.body);
  const deleteDeck = await prisma.deck.delete({
    where: {
      id: deck.id,
    },
  });
  res.status(200).json({ data: deleteDeck });
};

const requestFunctions = {
  POST: postRequest,
  GET: getRequest,
  DELETE: deleteRequest,
};

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  executeRequest(req, res, requestFunctions);
};
