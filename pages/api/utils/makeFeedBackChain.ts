import { LLMChain } from "langchain/chains";

import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";

export const makeFeedbackChain = () => {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
    topP: 1,
    timeout: 20000,
  });
  const prompt = PromptTemplate.fromTemplate(
    `As a fluent English speaker, evaluate my English proficiency in my response to a message. 
    Given the messages delimited by ///:
    Message:/// {message} ///.
    and the response:/// {response} ///.
    Offer precise suggestions for grammar and vocabulary improvement, supplemented with examples.
    Don't be vague and enrich your feedback with examples for clearer understanding.
    Assign a proficiency score from 0-5 for both grammar and vocabulary.
    Your feedback should be in Spanish, but maintaining original English terms when referencing specific vocabulary or grammar points.
    Provide the output in a JSON object with the following keys: grammar_feedback,grammar_score, vocabulary_score, vocabulary_feedback, general_score.   
    `
  );
  const chain = new LLMChain({ llm: model, prompt });

  return chain;
};
