import type { NextApiRequest, NextApiResponse } from "next";
import { makeChatChain } from "./utils/makeChatChain";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { response } = req.body;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!response) {
    return res.status(400).json({ message: "No message in the request" });
  }

  try {
    const { chain, memory } = makeChatChain();
    const answer = await chain.call({ input: response });

    res.status(200).json({
      response: answer.response,
    });
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
