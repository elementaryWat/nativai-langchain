import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  AIMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

const SYSTEM_PROMPT = `You are an helpful AI assistant that will help me to practice English talking about the chosen topic. Your answers are short and concise with at most two sentences.`;
const AI_PROMPT = `Hello, I'm Nati and I am going to talk with you about any topic and practice english in the process. It's great to meet you today. What would you like to talk about?`;

export const makeChatChain = () => {
  // We can also construct an LLMChain from a ChatPromptTemplate and a chat model.
  const chat = new ChatOpenAI({ temperature: 0 });
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(SYSTEM_PROMPT),
    AIMessagePromptTemplate.fromTemplate(AI_PROMPT),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
  ]);
  const chain = new LLMChain({
    prompt: chatPrompt,
    llm: chat,
  });
  return chain;
};
