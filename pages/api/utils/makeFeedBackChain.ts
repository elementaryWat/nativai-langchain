import { LLMChain } from "langchain/chains";

import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";

export const makeFeedbackChain = () => {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
    timeout: 20000,
  });
  const prompt = PromptTemplate.fromTemplate(
    `You are an english native speaker that gives feedback for improving my english skills based on the response to a message.
    Message: # {message} #.
    Response: # {response} #.
    Give me feedback on suggestions to improve the grammar and vocabulary for the answer.
    Also give me an score that reflects the english level of the response in a qualitative way.
    The options for the score are: Basic (if the sentence has many grammar mistakes and a poor vocabulary), Intermediate (if has a few grammar mistakes and a good vocabulary), Advanced (if the sentence doesn't have grammar mistakes and a rich vocabulary)
    Provide the output in a JSON format with this keys: grammar_feedback, vocabulary_feedback, answer_suggestions, score
    `
  );
  const chain = new LLMChain({ llm: model, prompt });

  return chain;
};
