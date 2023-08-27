import type { NextApiRequest, NextApiResponse } from "next";
import { makeChatChain } from "../utils/makeChatChain";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, username, chatId, level, topic } = req.body;
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!message) {
    return res.status(400).json({ message: "No message in the request" });
  }

  try {
    const { chain, memory } = await makeChatChain(
      chatId,
      username,
      level,
      topic
    );
    console.log(await memory.chatHistory.getMessages());
    const answer = await chain.call({ text: message });

    res.status(200).json({
      response: answer.response,
    });
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
