import { configureStore } from "@reduxjs/toolkit";
import chatbotsSlice from "./chatbot/chatbotSlice";

export const store = configureStore({
  reducer: {
    chatbot: chatbotsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
