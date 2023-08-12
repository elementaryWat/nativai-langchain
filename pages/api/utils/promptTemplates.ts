import { PromptTemplate } from "langchain";
import { AI_INTRODUCTION_PROMPT, SYSTEM_PROMPT } from "../../../constants";

export const promptSystem = new PromptTemplate({
  template: SYSTEM_PROMPT,
  inputVariables: ["topic", "level"],
});

export const promptIntroduction = new PromptTemplate({
  template: AI_INTRODUCTION_PROMPT,
  inputVariables: ["username", "topic", "intro"],
});
