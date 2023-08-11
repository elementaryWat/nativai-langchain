import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import MessagesContainer from "../components/Messages/MessagesContainer";
import {
  ChatContainer,
  FixedInputContainer,
  StyledFab,
} from "../components/styles";
import { playAudio, synthesizeSpeech } from "../utils/synthesizeSpeech";
import { useChat } from "../store/chatbot/useChat";
import { postChat, postFeedback } from "../utils/endpoints";
// import FeedbackUser from "../components/FeedBackUser/FeedBackUser";
import { trackError, trackStartEndChat } from "../utils/analyticsMethods";
import { useRouter } from "next/router";
import GradingIcon from "@mui/icons-material/Grading";
import { INTERACTIONS_LIMIT } from "../utils/const";
import { addNewChatUsage } from "../utils/userUsageUpdate";
import { useSession } from "next-auth/react";
import ChatMenuBar from "../components/base/Header";
import { Grid } from "@mui/material";

const Chat: React.FC = () => {
  const {
    chatId,
    username,
    messages,
    // isAudioPlaying,
    loading,
    levelConversation,
    topicConversation,
    addMessage,
    addFeedBack,
    setLoadingStatus,
    setErrorFeedback,
    // setAudioPlaying,
  } = useChat();
  const router = useRouter();
  const { data: session } = useSession();
  const [reachedFeedbackLimit, setReachedFeedbackLimit] = useState(false);
  const [interactionsRemaining, setInteractionsRemaining] =
    useState(INTERACTIONS_LIMIT);

  useEffect(() => {
    if (messages.length === 0) {
      router.replace("/");
    }
    if (messages.length === 1) {
      // synthesizeSpeech(messages[0].content);
      trackStartEndChat(chatId, username, levelConversation, topicConversation);
      addNewChatUsage(session.user.email);
    }
  }, []);

  useEffect(() => {
    if (interactionsRemaining === 0) {
      // router.replace("/feedback");
      setReachedFeedbackLimit(true);
    }
  }, [messages]);

  const handleSubmit = async (message: string, edit?: boolean) => {
    if (!edit) {
      addMessage({
        role: "user",
        content: message,
        loadingFeedback: false,
      });
      setInteractionsRemaining(
        (interactionsRemaining) => interactionsRemaining - 1
      );
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
      await synthesizeSpeech(response);
      // const audioUrl = await synthesizeSpeech(response);
      // playAudio(audioUrl, isAudioPlaying, setAudioPlaying);

      addMessage({
        role: "assistant",
        content: response,
        loadingFeedback: false,
        // audioUrl,
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
      setLoadingStatus(false);
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
    <>
      <ChatMenuBar interactionsRemaining={interactionsRemaining} />
      <ChatContainer>
        {/* <Typography variant="h4" align="center">
        Interviewer Chatbot
      </Typography> */}
        <MessagesContainer onSubmit={handleSubmit} />
        <FixedInputContainer>
          {reachedFeedbackLimit ? (
            <Grid container justifyContent="center" spacing={1}>
              <StyledFab
                onClick={() => router.replace("/feedback")}
                aria-label="feedback"
                color="primary"
              >
                <GradingIcon />
              </StyledFab>
            </Grid>
          ) : (
            <Input onSubmit={handleSubmit} loadingMessage={loading} />
          )}
        </FixedInputContainer>
      </ChatContainer>
    </>
  );
};

export default Chat;
