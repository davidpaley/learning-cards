import type { NextApiRequest, NextApiResponse } from "next";
import { Card } from "@prisma/client";
import { getSession } from "next-auth/react";
import { Response as ClassResponse } from "../../pages/api/classes";
import { Response as DecksResponse } from "../../pages/api/decks";
import { Session } from "next-auth";

const executeRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
  requestFunctions: {
    POST: (
      req: NextApiRequest,
      res: NextApiResponse<Card | ClassResponse | DecksResponse>
    ) => Promise<void>;
    GET: (
      req: NextApiRequest,
      res: NextApiResponse<Card | ClassResponse | DecksResponse>,
      session?: Session
    ) => Promise<void>;
    DELETE: (
      req: NextApiRequest,
      res: NextApiResponse<Card | ClassResponse | DecksResponse>
    ) => Promise<void>;
  }
) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401);
  }
  const { method } = req;
  const functionRequest = requestFunctions[method];
  if (!functionRequest) {
    return res.status(400);
  }
  functionRequest(req, res, session);
};

export default executeRequest;
