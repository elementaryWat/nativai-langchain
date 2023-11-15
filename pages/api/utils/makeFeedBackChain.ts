import { LLMChain } from "langchain/chains";

import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import {
  AI_FINAL_FEEDBACK_PROMPT,
  AI_LOCAL_FEEDBACK_PROMPT,
} from "../../../constants";
import { FeedbackType } from "@/types/Message";

export const makeFeedbackChain = (feedbackType: FeedbackType) => {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
    timeout: 50000,
  });
  const prompt = PromptTemplate.fromTemplate(
    feedbackType === "final"
      ? AI_FINAL_FEEDBACK_PROMPT
      : AI_LOCAL_FEEDBACK_PROMPT
  );
  const chain = new LLMChain({ llm: model, prompt });

  return chain;
};
