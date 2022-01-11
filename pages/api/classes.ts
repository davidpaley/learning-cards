import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Deck } from "@prisma/client";
const prisma = new PrismaClient();

type ClassData = {
  name: string;
  decks?: Deck[];
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ClassData[]>
) => {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);

    const saveClass = await prisma.classForDecks.create({
      data,
    });
    res.status(200).json([saveClass]);
    return;
  } else if (req.method === "GET") {
    console.log("entro al get");
    const foundDesks = await prisma.classForDecks.findMany({
      select: {
        name: true,
        decks: true,
      },
    });
    console.log({ foundDesks });
    res.status(200).json(foundDesks);
    return;
  }
  return res.status(405).json({ message: "Method not allowed" } as any);
};