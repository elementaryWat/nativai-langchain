import type { NextApiRequest, NextApiResponse } from "next";
import { makeChatChain } from "../../utils/makeChatChain";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, history } = req.body;

  console.log("message", message);

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!message) {
    return res.status(400).json({ message: "No message in the request" });
  }

  try {
    //create chain
    const { chain, memory } = makeChatChain();
    const answer = await chain.call({
      input: message,
    });
    res.status(200).json({
      response: answer.response,
    });
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
