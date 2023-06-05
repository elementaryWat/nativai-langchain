import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { FeedBack, Message as MessageType } from "../../types/Message";
import {
  selectTopic,
  selectLoading,
  selectMessages,
  selectLevel,
  selectChatId,
  selectUsername,
} from "./selectors";
import {
  addMessageAction,
  setLevel,
  setLoading,
  addFeedBackToLastMessage,
  setLastUserMessageIndex,
  setTopic,
  setUsernameAction,
  setMessagesAction,
} from "./chatbotSlice";
import { PromptTemplate } from "langchain";
import {
  AI_INTRODUCTION_PROMPT,
  INTRODUCTIONS,
  TOPICS,
} from "../../utils/const";
import { promptIntroduction } from "../../pages/api/utils/promptTemplates";

export const useChat = () => {
  const dispatch = useDispatch();
  const chatId = useSelector(selectChatId);
  const username = useSelector(selectUsername);
  const levelConversation = useSelector(selectLevel);
  const topicConversation = useSelector(selectTopic);
  const messages = useSelector(selectMessages);
  const loading = useSelector(selectLoading);

  const getInitialMessage = useCallback(async () => {
    setMessages([]);

    const AI_INTRODUCTION = await promptIntroduction.format({
      username,
      topic: TOPICS[topicConversation],
      intro: INTRODUCTIONS[topicConversation],
    });
    dispatch(
      addMessageAction({
        role: "assistant",
        content: AI_INTRODUCTION,
        feedback: null,
        loadingFeedback: false,
      })
    );
  }, [dispatch, topicConversation]);

  // useEffect(() => {
  //   if (
  //     messages.length > 0 &&
  //     username !== "" &&
  //     levelConversation !== "" &&
  //     topicConversation !== ""
  //   ) {
  //     setMessages([]);
  //     getInitialMessage();
  //   }
  // }, [messages, username, levelConversation, topicConversation]);

  const setUsername = useCallback(
    (username: string) => {
      dispatch(setUsernameAction(username));
    },
    [dispatch]
  );

  const setLevelConversation = useCallback(
    (level: string) => {
      dispatch(setLevel(level));
    },
    [dispatch]
  );

  const setTopicConversation = useCallback(
    (topic: string) => {
      dispatch(setTopic(topic));
    },
    [dispatch]
  );

  const setMessages = useCallback(
    (messages: MessageType[]) => {
      dispatch(setMessagesAction(messages));
    },
    [dispatch]
  );

  const addMessage = useCallback(
    (message: MessageType) => {
      dispatch(addMessageAction(message));
      if (message.role === "user") {
        dispatch(setLastUserMessageIndex(messages.length));
      }
    },
    [dispatch, messages]
  );

  const addFeedBack = useCallback(
    (feedback: FeedBack) => {
      dispatch(addFeedBackToLastMessage({ feedback }));
    },
    [dispatch, messages]
  );

  const setLoadingStatus = useCallback(
    (status: boolean) => {
      dispatch(setLoading(status));
    },
    [dispatch]
  );

  return {
    chatId,
    username,
    messages,
    loading,
    levelConversation,
    topicConversation,
    getInitialMessage,
    setUsername,
    addMessage,
    addFeedBack,
    setLoadingStatus,
    setLevelConversation,
    setTopicConversation,
  };
};
