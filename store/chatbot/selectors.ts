import { createSelector } from "reselect";
import { RootState } from "..";

const selectChatbotState = (state: RootState) => state.chatbot;

export const selectChatId = createSelector(
  selectChatbotState,
  (chat) => chat.id
);

export const selectUsername = createSelector(
  selectChatbotState,
  (chat) => chat.username
);

export const selectLevel = createSelector(
  selectChatbotState,
  (chat) => chat.level
);

export const selectTopic = createSelector(
  selectChatbotState,
  (chat) => chat.topic
);

export const selectMessages = createSelector(
  selectChatbotState,
  (chat) => chat.messages
);

export const selectLoading = createSelector(
  selectChatbotState,
  (chat) => chat.loading
);
