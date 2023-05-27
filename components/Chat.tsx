import React, { useState } from "react";
import Input from "./Input";
import { Message as MessageType } from "../types/Message";
// import openai from "../api/completionAPI";
import MessagesContainer from "./Messages/MessagesContainer";
import { ChatContainer, FixedInputContainer } from "./styles";
import { Typography } from "@mui/material";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: "system",
      content:
        "You are a chatbot that conducts a screening interview with a software developer. Start by introducing yourself and by asking one question to get to know the candidate.",
    },
    {
      role: "assistant",
      content:
        "Hello, I'm RecruiterGPT and I am a technical recruiter. It's great to meet you today. To start off, could you tell me a bit about yourself?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (message: string) => {
    const newMessage: MessageType = {
      role: "user",
      content: message,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
        }),
      });
      const data = await response.json();
      console.log(data);

      // const assistantResponse: MessageType = {
      //   role: "assistant",
      //   content: completion.data.choices[0].message?.content as string,
      // };

      // setMessages((prevMessages) => [...prevMessages, assistantResponse]);
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
