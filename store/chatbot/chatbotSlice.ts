import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedBack, Message as MessageType } from "../../types/Message";

interface ChatbotState {
  id: string;
  username: string;
  topic: string;
  lastUserMessageIndex: number;
  messages: MessageType[];
  audioPlaying: boolean;
  loading: boolean;
}

const initialState: ChatbotState = {
  id: `chat-${new Date().toISOString()}`,
  username: "",
  topic: "",
  lastUserMessageIndex: 1,
  messages: [],
  audioPlaying: false,
  loading: false,
};

export const chatbotConfigSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    setChatIdAction: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setUsernameAction: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
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
    removeLastAIResponseAction: (state) => {
      state.messages = state.messages.filter(
        (message, index) => index <= state.messages.length - 2
      );
    },
    setAudioPlayingAction: (state, action: PayloadAction<boolean>) => {
      state.audioPlaying = action.payload;
    },
    setLastUserMessageIndex: (state, action: PayloadAction<number>) => {
      state.lastUserMessageIndex = action.payload;
      state.messages[action.payload].loadingFeedback = true;
    },
    editLastUserMessageAction: (state, action: PayloadAction<string>) => {
      state.messages[state.lastUserMessageIndex].content = action.payload;
      state.messages[state.lastUserMessageIndex].feedback = null;
    },
    setErrorFeedBackToLastMessage: (state) => {
      state.messages[state.lastUserMessageIndex].loadingFeedback = false;
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
  setChatIdAction,
  setUsernameAction,
  setTopic,
  setMessagesAction,
  addMessageAction,
  removeLastAIResponseAction,
  setAudioPlayingAction,
  setLastUserMessageIndex,
  editLastUserMessageAction,
  addFeedBackToLastMessage,
  setErrorFeedBackToLastMessage,
  setLoading,
} = chatbotConfigSlice.actions;

export default chatbotConfigSlice;
