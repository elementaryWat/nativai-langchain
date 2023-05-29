import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { UpstashRedisChatMessageHistory } from "langchain/stores/message/upstash_redis";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { createClient } from "redis";
import {
  AIMessagePromptTemplate,
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

const SYSTEM_PROMPT = `The following is a friendly conversation between a human and an AI. The AI is a helpful AI assistant that helps the human to practice English talking about the chosen topic. The answers of the AI are short and concise with at most two sentences.`;
const AI_INTRODUCTION = `Hello, I'm Nati and I am going to talk with you about any topic and practice english in the process. It's great to meet you today. What would you like to talk about?`;

export const makeChatChain = () => {
  //   import { BufferMemory, ConversationChain, MessagesPlaceholder } from "langchain";
  // import { ChatOpenAI } from "langchain/chat_models/openai";
  // import { HumanChatMessage } from "langchain/schema";
  const chat = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
  });
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(SYSTEM_PROMPT),
    AIMessagePromptTemplate.fromTemplate(AI_INTRODUCTION),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);
  const memory = new BufferMemory({
    returnMessages: true,
    memoryKey: "history",
    chatHistory: new UpstashRedisChatMessageHistory({
      sessionId: "memory", // Or some other unique identifier for the conversation
      sessionTTL: 300, // 5 minutes, omit this parameter to make sessions never expire
      config: {
        url: "https://helping-clam-36296.upstash.io",
        token:
          "AY3IACQgZTIyMTc4MjEtNWMzYy00YmI3LWJmYzAtM2MxNzgzNGQ0YzlmNjcwNmYyODYyYjg5NDhlZGI3N2IyNWE1ZWE5NTBiNTQ=",
      },
    }),
  });
  const chain = new ConversationChain({
    memory,
    prompt: chatPrompt,
    llm: chat,
  });

  return { chain, memory };
};
