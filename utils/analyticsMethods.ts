import { logEvent } from "firebase/analytics";
import { analytics } from "./firebaseClient";

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  START_CONVERSATION: "start_conversation",
  CONTINUE_CONVERSATION: "continue_conversation",
  END_CONVERSATION_BTN: "end_conversation_btn",
  CHAT_MESSAGE: "chat_message",
  ERROR_OCURRED: "error_ocurred",
  FEEDBACK_RESPONSE: "feedback_response",
  FEEDBACK: "feedback",
  CLOSE_FEEDBACK: "close_feedback",
  END_CONVERSATION: "end_conversation",
  CLICK_SUBSCRIPTION_BTN: "click_subscription_btn",
  WELCOME_SUBSCRIPTION_PAGE: "welcome_subscription_page",
  CANCEL_SUBSCRIPTION: "cancel_subscription",
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

export const trackStartEndChat = (
  chatId: string,
  email: string,
  levelConversation: string,
  topicConversation: string,
  start: boolean = true
) => {
  try {
    logEvent(
      analytics,
      start
        ? ANALYTICS_EVENTS.START_CONVERSATION
        : ANALYTICS_EVENTS.END_CONVERSATION,
      {
        chatId,
        email,
        levelConversation,
        topicConversation,
      }
    );
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
  email: string,
  lengthConversation: number,
  rating: number,
  comment: string
) => {
  try {
    logEvent(analytics, ANALYTICS_EVENTS.FEEDBACK, {
      chatId,
      email,
      lengthConversation,
      rating,
      comment,
    });
  } catch (e) {
    console.error(e);
  }
};

export const trackCloseFeedback = (chatId: string, username: string) => {
  try {
    logEvent(analytics, ANALYTICS_EVENTS.CLOSE_FEEDBACK, {
      chatId,
      username,
    });
  } catch (e) {
    console.error(e);
  }
};

export const trackOpenFeedbackMessage = (message: string, feedback: string) => {
  try {
    logEvent(analytics, ANALYTICS_EVENTS.FEEDBACK_RESPONSE, {
      message,
      feedback,
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
