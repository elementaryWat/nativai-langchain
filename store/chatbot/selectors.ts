import { createSelector } from "reselect";
import { AppState } from "..";

const selectChatbotState = (state: AppState) => state.chatbot;

export const selectChatId = createSelector(
  selectChatbotState,
  (chat) => chat.id
);

export const selectUsername = createSelector(
  selectChatbotState,
  (chat) => chat.username
);

export const selectTopic = createSelector(
  selectChatbotState,
  (chat) => chat.topic
);

export const selectMessages = createSelector(
  selectChatbotState,
  (chat) => chat.messages
);

export const selectIsAudioPlaying = createSelector(
  selectChatbotState,
  (chat) => chat.audioPlaying
);

export const selectLoading = createSelector(
  selectChatbotState,
  (chat) => chat.loading
);
