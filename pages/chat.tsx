import React from "react";
import Input from "../components/Input";
import { MessageItem } from "../types/Message";
import MessagesContainer from "../components/Messages/MessagesContainer";
import { ChatContainer, FixedInputContainer } from "../components/styles";
import { Typography } from "@mui/material";
import { synthesizeSpeech } from "../utils/synthesizeSpeech";
import { useChat } from "../store/chatbot/useChat";

const Chat: React.FC = () => {
  const { messages, loading, addMessage, addFeedBack, setLoadingStatus } =
    useChat();

  const handleSubmit = async (message: string) => {
    const newMessage = new MessageItem("user", message);
    addMessage(newMessage);
    setLoadingStatus(true);

    try {
      const dataResponse = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messages[messages.length - 1],
          response: newMessage.content,
        }),
      });
      const { response, feedback } = await dataResponse.json();
      await synthesizeSpeech(response);
      addMessage(new MessageItem("assistant", response));
      addFeedBack(feedback);

      setLoadingStatus(false);
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
      <MessagesContainer messages={messages} loading={loading} />
      <FixedInputContainer>
        <Input onSubmit={handleSubmit} />
      </FixedInputContainer>
    </ChatContainer>
  );
};

export default Chat;
