import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedBack, Message as MessageType } from "../../types/Message";

interface ChatbotState {
  id: string;
  level: string;
  topic: string;
  lastUserMessageIndex: number;
  messages: MessageType[];
  loading: boolean;
}

const initialState: ChatbotState = {
  id: `chat-${new Date().toISOString()}`,
  level: "",
  topic: "",
  lastUserMessageIndex: 1,
  messages: [],
  loading: false,
};

export const chatbotConfigSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    addMessageAction: (state, action: PayloadAction<MessageType>) => {
      state.messages.push(action.payload);
    },
    setLastUserMessageIndex: (state, action: PayloadAction<number>) => {
      state.lastUserMessageIndex = action.payload;
      state.messages[action.payload].loadingFeedback = true;
    },
    addFeedBackToLastMessage: (
      state,
      action: PayloadAction<{ feedback: FeedBack }>
    ) => {
      state.messages[state.lastUserMessageIndex].loadingFeedback = false;
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
  setTopic,
  addMessageAction,
  setLastUserMessageIndex,
  addFeedBackToLastMessage,
  setLoading,
} = chatbotConfigSlice.actions;

export default chatbotConfigSlice;
