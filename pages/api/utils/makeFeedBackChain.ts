import { LLMChain } from "langchain/chains";

import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";

export const makeFeedbackChain = () => {
  const model = new OpenAI({ temperature: 0, timeout: 20000 });
  const prompt = PromptTemplate.fromTemplate(
    `Act like an english teacher that gives feedback for improving my english skills based on the response to a message.
    Message: # {message} #.
    Response: # {response} #.
    Give me feedback on grammar and vocabulary for the response.
    Also give me a score that reflects the english level of the response using the MCER standard.
    Provide the output in a JSON format with this keys: feedback, score
    `
  );
  const chain = new LLMChain({ llm: model, prompt });

  return chain;
};