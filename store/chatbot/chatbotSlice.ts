import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FeedBack,
  Message as MessageType,
  MessageItem,
} from "../../types/Message";

interface ChatbotState {
  level: string;
  lastUserMessageIndex: number;
  messages: MessageType[];
  loading: boolean;
}

const initialState: ChatbotState = {
  level: "",
  lastUserMessageIndex: 1,
  messages: [
    new MessageItem(
      "assistant",
      "Hello, I'm Nati and I am going to talk with you about any topic and practice english in the process. It's great to meet you today. What would you like to talk about?"
    ),
  ],
  loading: false,
};

export const chatbotConfigSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
    addMessageAction: (state, action: PayloadAction<MessageType>) => {
      state.messages.push(action.payload);
    },
    setLastUserMessageIndex: (state, action: PayloadAction<number>) => {
      state.lastUserMessageIndex = action.payload;
    },
    addFeedBackToLastMessage: (
      state,
      action: PayloadAction<{ feedback: FeedBack }>
    ) => {
      state.messages[state.lastUserMessageIndex].feedback =
        action.payload.feedback;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setLevel,
  addMessageAction,
  setLastUserMessageIndex,
  addFeedBackToLastMessage,
  setLoading,
} = chatbotConfigSlice.actions;

export default chatbotConfigSlice;
