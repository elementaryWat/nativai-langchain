import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import MessagesContainer from "../components/Messages/MessagesContainer";
import { ChatContainer, FixedInputContainer } from "../components/styles";
import { synthesizeSpeech } from "../utils/synthesizeSpeech";
import { useChat } from "../store/chatbot/useChat";
import { postChat, postFeedback } from "../utils/endpoints";
import FeedbackDialog from "../components/FeedBackUser/FeedBackUser";

const Chat: React.FC = () => {
  const {
    chatId,
    username,
    messages,
    levelConversation,
    topicConversation,
    addMessage,
    addFeedBack,
    setLoadingStatus,
  } = useChat();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (messages.length === 1) {
      synthesizeSpeech(messages[0].content);
    }
    const timer = setTimeout(() => {
      setOpenDialog(true);
    }, 60000);

    return () => clearTimeout(timer); // this will clear Timeout when component unmonts.
  }, []);

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
        username,
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
      <FeedbackDialog open={openDialog} setOpen={setOpenDialog} />
    </ChatContainer>
  );
};

export default Chat;
