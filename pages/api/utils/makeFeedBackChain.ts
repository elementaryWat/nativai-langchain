import { LLMChain } from "langchain/chains";

import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { AI_FEEDBACK_PROMPT } from "../../../utils/const";

export const makeFeedbackChain = () => {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
    topP: 1,
    timeout: 20000,
  });
  const prompt = PromptTemplate.fromTemplate(AI_FEEDBACK_PROMPT);
  const chain = new LLMChain({ llm: model, prompt });

  return chain;
};
