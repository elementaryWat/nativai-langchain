import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { UpstashRedisChatMessageHistory } from "langchain/stores/message/upstash_redis";
import { ChatOpenAI } from "langchain/chat_models/openai";

import {
  AIMessagePromptTemplate,
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { INTRODUCTIONS, TOPICS } from "../../../utils/const";
import { promptIntroduction, promptSystem } from "./promptTemplates";

export const makeChatChain = async (
  chatId: string,
  username: string,
  levelConversation: string,
  topicConversation: string
) => {
  const chat = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
    timeout: 15000,
  });

  const SYSTEM_CONFIG = await promptSystem.format({
    level: levelConversation,
    topic: TOPICS[topicConversation],
  });

  const AI_INTRODUCTION = await promptIntroduction.format({
    username,
    topic: TOPICS[topicConversation],
    intro: INTRODUCTIONS[topicConversation],
  });

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(SYSTEM_CONFIG),
    AIMessagePromptTemplate.fromTemplate(AI_INTRODUCTION),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
  ]);
  const memory = new BufferMemory({
    returnMessages: true,
    memoryKey: "history",
    chatHistory: new UpstashRedisChatMessageHistory({
      sessionId: chatId, // Or some other unique identifier for the conversation
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
