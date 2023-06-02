export const postChat = async (response: string) => {
  try {
    const dataResponse = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        response,
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
