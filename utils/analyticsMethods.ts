import { logEvent } from "firebase/analytics";
import { analytics } from "./firebaseClient";

const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  START_CONVERSATION: "start_conversation",
  CHAT_MESSAGE: "chat_message",
  ERROR_OCURRED: "error_ocurred",
  FEEDBACK_RESPONSE: "feedback_response",
  FEEDBACK: "feedback",
  END_CONVERSATION: "end_conversation",
};

interface EventParams {
  [key: string]: string | number | boolean;
}

export const setPageView = (pageName: string) => {
  logEvent(analytics, ANALYTICS_EVENTS.PAGE_VIEW, { page: pageName });
};

export const trackEvent = (eventName: string, eventParams?: EventParams) => {
  logEvent(analytics, eventName, eventParams);
};

export const trackStartChat = (
  chatId: string,
  username: string,
  levelConversation: string,
  topicConversation: string
) => {
  logEvent(analytics, ANALYTICS_EVENTS.START_CONVERSATION, {
    chatId,
    username,
    levelConversation,
    topicConversation,
  });
};

export const trackChatMessage = (
  userId: string,
  message: string,
  messageType: "sent" | "received"
) => {
  logEvent(analytics, ANALYTICS_EVENTS.CHAT_MESSAGE, {
    userId,
    message,
    messageType,
  });
};

export const trackFeedback = (
  chatId: string,
  username: string,
  lengthConversation: number,
  rating: number,
  comment: string
) => {
  logEvent(analytics, ANALYTICS_EVENTS.FEEDBACK, {
    chatId,
    username,
    lengthConversation,
    rating,
    comment,
  });
};

export const trackError = (error: string) => {
  logEvent(analytics, ANALYTICS_EVENTS.FEEDBACK, {
    error,
  });
};

export const trackEndChat = (userId: string) => {
  logEvent(analytics, ANALYTICS_EVENTS.END_CONVERSATION, { userId });
};
