import type { NextApiRequest, NextApiResponse } from "next";
import { makeChatChain } from "../../utils/makeChatChain";
import { makeFeedbackChain } from "../../utils/makeFeedBackChain";

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
    const feedbackChain = makeFeedbackChain();
    const answer = await chain.call({
      input: message,
    });
    const proofReaded = await feedbackChain.call({
      input: message,
    });
    console.log(proofReaded);
    res.status(200).json({
      response: answer.response,
      proofreadResponse: proofReaded.response,
    });
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
