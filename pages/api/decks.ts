import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type Data = {
    name: string
  }
  
  export default async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) => {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'} as any)
    }
    const deck = JSON.parse(req.body)

    const saveDeck = await prisma.deck.create({
        data: deck
    })
    res.status(200).json(saveDeck)
  }
  