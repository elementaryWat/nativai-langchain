import type { NextApiRequest, NextApiResponse } from "next";
import { makeChatChain } from "../../utils/makeChatChain";
import { makeFeedbackChain } from "../../utils/makeFeedBackChain";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, response } = req.body;

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
      input: response,
    });
    const feedback = await feedbackChain.call({
      message,
      response,
    });
    console.log(feedback);
    res.status(200).json({
      response: answer.response,
      feedback: JSON.parse(feedback.text),
    });
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
