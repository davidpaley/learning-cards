import type { NextApiRequest, NextApiResponse } from "next";
import { ClassForDecks, PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

interface CustomClass
  extends Omit<ClassForDecks, "userEmail" | "creationDate"> {}

export interface Response {
  isNotLogged: boolean;
  data?: CustomClass | CustomClass[];
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(200).json({ isNotLogged: true });
  }
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const saveClass = await prisma.classForDecks.create({
      data,
    });
    res.status(200).json({ data: saveClass, isNotLogged: false });
    return;
  } else if (req.method === "GET") {
    const foundClasses = await prisma.classForDecks.findMany({
      where: {
        userEmail: session.user.email as string,
      },
      select: {
        name: true,
        decks: true,
        id: true,
      },
    });

    res.status(200).json({ data: foundClasses, isNotLogged: false });
    return;
  }
  return res.status(405).json({ message: "Method not allowed" } as any);
};
