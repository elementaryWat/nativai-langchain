export const postChat = async (
  chatId: string,
  username: string,
  message: string,
  levelConversation: string,
  topicConversation: string
) => {
  try {
    const dataResponse = await fetch("/api/chat", {
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

export const postFeedback = async (message: string, response: string) => {
  try {
    const dataResponse = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        response,
      }),
    });
    return await dataResponse.json();
  } catch (error) {
    console.error("Error sending transcript to the Feedback API:", error);
    throw error;
  }
};

export const saveChatbotConfig = async (chatBotConfig: {
  topic: string;
  level: string;
}) => {
  try {
    const dataResponse = await fetch("/api/saveConfigToFb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatBotConfig),
    });
    return await dataResponse.json();
  } catch (error) {
    console.error("Error sending transcript to the Feedback API:", error);
    throw error;
  }
};