import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Deck } from "@prisma/client";
// import { getToken } from "next-auth/jwt";
const prisma = new PrismaClient();

type ClassData = {
  name: string;
  decks?: Deck[];
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ClassData[] | { isNotLogged: boolean }>
) => {
  // console.log("123");
  // const token = await getToken({ req });
  // console.log({ token });
  // if (!token) {
  //   console.log("entro");
  //   res.status(401).json({ isNotLogged: true });
  //   return;
  // }
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const saveClass = await prisma.classForDecks.create({
      data,
    });
    res.status(200).json([saveClass]);
    return;
  } else if (req.method === "GET") {
    const foundClasses = await prisma.classForDecks.findMany({
      // where: {
      //   userEmail: "david.paleyy@gmail.com",
      // },
      select: {
        name: true,
        decks: true,
        id: true,
      },
    });

    res.status(200).json(foundClasses);
    return;
  }
  return res.status(405).json({ message: "Method not allowed" } as any);
};
