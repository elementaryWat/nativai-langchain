import React, { useState } from "react";
import Input from "./Input";
import { Message as MessageType, MessageItem } from "../types/Message";
// import openai from "../api/completionAPI";
import MessagesContainer from "./Messages/MessagesContainer";
import { ChatContainer, FixedInputContainer } from "./styles";
import { Typography } from "@mui/material";
import { synthesizeSpeech } from "../utils/synthesizeSpeech";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    new MessageItem(
      "assistant",
      "Hello, I'm Nati and I am going to talk with you about any topic and practice english in the process. It's great to meet you today. What would you like to talk about?"
    ),
  ]);
  const [history, setHistory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (message: string) => {
    const newMessage = new MessageItem("user", message);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);

    try {
      const dataResponse = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage.content,
        }),
      });
      const { response, memory } = await dataResponse.json();
      await synthesizeSpeech(response);

      setMessages((prevMessages) => [
        ...prevMessages,
        new MessageItem("assistant", response),
      ]);
      setHistory(memory);

      setLoading(false);
    } catch (error) {
      console.error(
        "Error sending transcript to the Chat Completion API:",
        error
      );
    }
  };

  return (
    <ChatContainer>
      <Typography variant="h4" align="center">
        Interviewer Chatbot
      </Typography>
      <MessagesContainer messages={messages} loading={loading} />
      <FixedInputContainer>
        <Input onSubmit={handleSubmit} />
      </FixedInputContainer>
    </ChatContainer>
  );
};

export default Chat;
