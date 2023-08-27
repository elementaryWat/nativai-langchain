import { FeedbackType } from "@/types/Message";

export const postChat = async (
  chatId: string,
  username: string,
  message: string,
  levelConversation: string,
  topicConversation: string
) => {
  try {
    const dataResponse = await fetch("/api/chat/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        username,
        message,
        level: levelConversation,
        topic: topicConversation,
      }),
    });
    return await dataResponse.json();
  } catch (error) {
    console.error(
      "Error sending transcript to the Chat Completion API:",
      error
    );
    throw error;
  }
};

export const requestLocalFeedback = async (
  message: string,
  response: string
) => {
  try {
    const dataResponse = await fetch("/api/chat/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        response,
        feedbackType: "local",
      }),
    });
    return await dataResponse.json();
  } catch (error) {
    console.error("Error sending transcript to the Feedback API:", error);
    throw error;
  }
};

export const requestFinalFeedback = async (
  grammarFeedbacks: string[],
  vocabularyFeedbacks: string[]
) => {
  try {
    const dataResponse = await fetch("/api/chat/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grammarFeedbacks,
        vocabularyFeedbacks,
        feedbackType: "final",
      }),
    });
    return await dataResponse.json();
  } catch (error) {
    console.error("Error sending transcript to the Feedback API:", error);
    throw error;
  }
};

export const cancelUserSubscription = async (subscriptionId: string) => {
  try {
    const dataResponse = await fetch("/api/payments/cancel-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subscriptionId }),
    });
    return await dataResponse.json();
  } catch (error) {
    console.error("Error sending transcript to the Feedback API:", error);
    throw error;
  }
};
