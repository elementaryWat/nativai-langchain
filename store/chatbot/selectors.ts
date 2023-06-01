import { createSelector } from "reselect";
import { RootState } from "..";

const selectChatbotState = (state: RootState) => state.chatbot;

export const selectLevel = createSelector(
  selectChatbotState,
  (chat) => chat.level
);

export const selectMessages = createSelector(
  selectChatbotState,
  (chat) => chat.messages
);

export const selectLoading = createSelector(
  selectChatbotState,
  (chat) => chat.loading
);
