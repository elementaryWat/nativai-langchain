import { LLMChain } from "langchain/chains";

import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain";

export const makeFeedbackChain = () => {
  const model = new OpenAI({ temperature: 0 });
  const prompt = PromptTemplate.fromTemplate(
    `Act like an english teacher that gives feedback for improving my engish skills.
    Give me grammar and vocabullary feedback on this sentence: {input}.
    `
  );
  const chain = new LLMChain({ llm: model, prompt });

  return chain;
};
