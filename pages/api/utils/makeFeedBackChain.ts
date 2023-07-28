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
    `Act as an English speaker tasked with providing feedback on my English skills.
      Given a message delimited by "", give relevant grammar corrections and suggest vocabulary improvements.
      Additionally, based on the feedback, score the proficiency level of the response in 0-5 scale. 
      Provide the output in a JSON format with the keys: grammar_feedback ,grammar_score, vocabulary_score, vocabulary_feedback, general_score.
      Message: ""{{ response }}"".
    `
  );
  const chain = new LLMChain({ llm: model, prompt });

  return chain;
};
