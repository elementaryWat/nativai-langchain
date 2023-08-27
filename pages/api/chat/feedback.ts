import type { NextApiRequest, NextApiResponse } from "next";
import { makeFeedbackChain } from "../utils/makeFeedBackChain";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { feedbackType } = req.body;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!feedbackType) {
    return res
      .status(400)
      .json({ message: "No feedback type provided in the request" });
  }

  let requestData;

  if (feedbackType === "local") {
    const { message, response } = req.body;

    if (!message || !response) {
      return res.status(400).json({
        message:
          "For 'local' feedback, both message and response are required.",
      });
    }

    requestData = { message, response };
  } else if (feedbackType === "final") {
    const { grammarFeedbacks, vocabularyFeedbacks } = req.body;

    if (!grammarFeedbacks || !vocabularyFeedbacks) {
      return res.status(400).json({
        message:
          "For 'final' feedback, both grammarFeedbacks and vocabularyFeedbacks are required.",
      });
    }

    requestData = { grammarFeedbacks, vocabularyFeedbacks };
  } else {
    return res.status(400).json({ message: "Invalid feedback type provided." });
  }

  try {
    //create chain
    const feedbackChain = makeFeedbackChain(feedbackType);
    const feedback = await feedbackChain.call(requestData);
    console.log(feedback);
    res.status(200).json({
      feedback: JSON.parse(feedback.text),
    });
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
