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
  try {
    logEvent(analytics, ANALYTICS_EVENTS.PAGE_VIEW, { page: pageName });
  } catch (e) {
    console.error(e);
  }
};

export const trackEvent = (eventName: string, eventParams?: EventParams) => {
  try {
    logEvent(analytics, eventName, eventParams);
  } catch (e) {
    console.error(e);
  }
};

export const trackStartChat = (
  chatId: string,
  username: string,
  levelConversation: string,
  topicConversation: string
) => {
  try {
    logEvent(analytics, ANALYTICS_EVENTS.START_CONVERSATION, {
      chatId,
      username,
      levelConversation,
      topicConversation,
    });
  } catch (e) {
    console.error(e);
  }
};

export const trackChatMessage = (
  userId: string,
  message: string,
  messageType: "sent" | "received"
) => {
  try {
    logEvent(analytics, ANALYTICS_EVENTS.CHAT_MESSAGE, {
      userId,
      message,
      messageType,
    });
  } catch (e) {
    console.error(e);
  }
};

export const trackFeedback = (
  chatId: string,
  username: string,
  lengthConversation: number,
  rating: number,
  comment: string
) => {
  try {
    logEvent(analytics, ANALYTICS_EVENTS.FEEDBACK, {
      chatId,
      username,
      lengthConversation,
      rating,
      comment,
    });
  } catch (e) {
    console.error(e);
  }
};

export const trackError = (error: string) => {
  try {
    logEvent(analytics, ANALYTICS_EVENTS.FEEDBACK, {
      error,
    });
  } catch (e) {
    console.error(e);
  }
};

export const trackEndChat = (userId: string) => {
  try {
    logEvent(analytics, ANALYTICS_EVENTS.END_CONVERSATION, { userId });
  } catch (e) {
    console.error(e);
  }
};
