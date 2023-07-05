import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import MessagesContainer from "../components/Messages/MessagesContainer";
import { ChatContainer, FixedInputContainer } from "../components/styles";
import { playAudio, synthesizeSpeech } from "../utils/synthesizeSpeech";
import { useChat } from "../store/chatbot/useChat";
import { postChat, postFeedback } from "../utils/endpoints";
import FeedbackDialog from "../components/FeedBackUser/FeedBackUser";
import { trackError, trackStartChat } from "../utils/analyticsMethods";
import { useRouter } from "next/router";

const Chat: React.FC = () => {
  const {
    chatId,
    username,
    messages,
    isAudioPlaying,
    loading,
    levelConversation,
    topicConversation,
    addMessage,
    addFeedBack,
    setLoadingStatus,
    setErrorFeedback,
    setAudioPlaying,
  } = useChat();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (messages.length === 0) {
      router.replace("/");
    }
    trackStartChat(chatId, username, levelConversation, topicConversation);
    // if (messages.length === 1) {
    //   synthesizeSpeech(messages[0].content);
    // }
  }, []);

  useEffect(() => {
    if (messages.length === 7) {
      setOpenDialog(true);
    }
  }, [messages]);

  const handleSubmit = async (message: string, edit?: boolean) => {
    if (!edit) {
      addMessage({
        role: "user",
        content: message,
        loadingFeedback: false,
      });
    }
    setLoadingStatus(true);
    try {
      const { response } = await postChat(
        chatId,
        username,
        message,
        levelConversation,
        topicConversation
      );

      const audioUrl = await synthesizeSpeech(response);
      playAudio(audioUrl, isAudioPlaying, setAudioPlaying);

      addMessage({
        role: "assistant",
        content: response,
        loadingFeedback: false,
        audioUrl,
      });
      setLoadingStatus(false);

      const { feedback } = await postFeedback(
        edit
          ? messages[messages.length - 3].content
          : messages[messages.length - 1].content,
        message
      );
      addFeedBack(feedback);
    } catch (error) {
      console.error(
        "Error sending transcript to the Chat Completion API:",
        error
      );
      setErrorFeedback();
      trackError(error);
    }
    // if (language !== ENGLISH_CODE) {
    //   addMessage({
    //     role: "assistant",
    //     content: RESPONSE_BACK_TO_ENGLISH,
    //     loadingFeedback: false,
    //   });
    //   await synthesizeSpeech(RESPONSE_BACK_TO_ENGLISH);
    // } else {

    // }
  };

  return (
    <ChatContainer>
      {/* <Typography variant="h4" align="center">
        Interviewer Chatbot
      </Typography> */}
      <MessagesContainer onSubmit={handleSubmit} />
      <FixedInputContainer>
        <Input onSubmit={handleSubmit} loadingMessage={loading} />
      </FixedInputContainer>
      <FeedbackDialog open={openDialog} setOpen={setOpenDialog} />
    </ChatContainer>
  );
};

export default Chat;
