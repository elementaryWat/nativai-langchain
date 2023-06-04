import React from "react";
import Input from "../components/Input";
import MessagesContainer from "../components/Messages/MessagesContainer";
import { ChatContainer, FixedInputContainer } from "../components/styles";
import { synthesizeSpeech } from "../utils/synthesizeSpeech";
import { useChat } from "../store/chatbot/useChat";
import { postChat, postFeedback } from "../utils/endpoints";

const Chat: React.FC = () => {
  const {
    chatId,
    messages,
    levelConversation,
    topicConversation,
    addMessage,
    addFeedBack,
    setLoadingStatus,
  } = useChat();

  const handleSubmit = async (message: string) => {
    addMessage({
      role: "user",
      content: message,
      loadingFeedback: false,
    });
    setLoadingStatus(true);

    try {
      const { response } = await postChat(
        chatId,
        message,
        levelConversation,
        topicConversation
      );
      await synthesizeSpeech(response);
      addMessage({
        role: "assistant",
        content: response,
        loadingFeedback: false,
      });
      setLoadingStatus(false);

      const { feedback } = await postFeedback(
        messages[messages.length - 1].content,
        message
      );
      addFeedBack(feedback);
    } catch (error) {
      console.error(
        "Error sending transcript to the Chat Completion API:",
        error
      );
    }
  };

  return (
    <ChatContainer>
      {/* <Typography variant="h4" align="center">
        Interviewer Chatbot
      </Typography> */}
      <MessagesContainer />
      <FixedInputContainer>
        <Input onSubmit={handleSubmit} />
      </FixedInputContainer>
    </ChatContainer>
  );
};

export default Chat;
