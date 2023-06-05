import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedBack, Message as MessageType } from "../../types/Message";

interface ChatbotState {
  id: string;
  username: string;
  level: string;
  topic: string;
  lastUserMessageIndex: number;
  messages: MessageType[];
  loading: boolean;
}

const initialState: ChatbotState = {
  id: `chat-${new Date().toISOString()}`,
  username: "",
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
    setUsernameAction: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    setMessagesAction: (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload;
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
  setUsernameAction,
  setLevel,
  setTopic,
  setMessagesAction,
  addMessageAction,
  setLastUserMessageIndex,
  addFeedBackToLastMessage,
  setLoading,
} = chatbotConfigSlice.actions;

export default chatbotConfigSlice;
