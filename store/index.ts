import { configureStore } from "@reduxjs/toolkit";
import chatbotsSlice from "./chatbot/chatbotSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
  reducer: {
    chatbot: chatbotsSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
