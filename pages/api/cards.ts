import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Card } from "@prisma/client";
import executeRequest from "../../src/utils/api";

const prisma = new PrismaClient();

type NewCard = Partial<Card>;

const postRequest = async (req: NextApiRequest, res: NextApiResponse<Card>) => {
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
  res.status(201).json(saveCard);
};

const getRequest = async (req: NextApiRequest, res: NextApiResponse<Card>) => {
  const { id } = req.query;
  const card = await prisma.card.findUnique({
    where: {
      id: id as string,
    },
  });
  res.status(200).json(card);
};

const deleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<Card>
) => {
  const cardId = JSON.parse(req.body);
  const deleteCard = await prisma.card.delete({
    where: {
      id: cardId,
    },
  });
  res.status(200).json(deleteCard);
};

const requestFunctions = {
  POST: postRequest,
  GET: getRequest,
  DELETE: deleteRequest,
};

export default async (req: NextApiRequest, res: NextApiResponse<Card>) => {
  executeRequest(req, res, requestFunctions);
};
