import type { NextApiRequest, NextApiResponse } from "next";
import { ClassForDecks, PrismaClient } from "@prisma/client";
import { CustomClass } from "../../src/types";
import { Session } from "next-auth";
import executeRequest from "../../src/utils/api";
const prisma = new PrismaClient();

export interface Response {
  data?: CustomClass | CustomClass[] | ClassForDecks;
}

const postRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const data = JSON.parse(req.body);
  const saveClass = await prisma.classForDecks.create({
    data,
  });
  res.status(201).json({ data: saveClass });
};

const getRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>,
  session: Session
) => {
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

  res.status(200).json({ data: foundClasses });
};

const deleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const { id } = JSON.parse(req.body);
  const deleteClass = await prisma.classForDecks.delete({
    where: {
      id,
    },
  });
  res.status(200).json({ data: deleteClass });
};

const requestFunctions = {
  POST: postRequest,
  GET: getRequest,
  DELETE: deleteRequest,
};

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  executeRequest(req, res, requestFunctions);
};
