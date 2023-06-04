import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { FeedBack, Message as MessageType } from "../../types/Message";
import {
  selectTopic,
  selectLoading,
  selectMessages,
  selectLevel,
  selectChatId,
} from "./selectors";
import {
  addMessageAction,
  setLevel,
  setLoading,
  addFeedBackToLastMessage,
  setLastUserMessageIndex,
  setTopic,
} from "./chatbotSlice";
import { PromptTemplate } from "langchain";
import {
  AI_INTRODUCTION_PROMPT,
  INTRODUCTIONS,
  TOPICS,
} from "../../utils/const";

export const useChat = () => {
  const dispatch = useDispatch();
  const chatId = useSelector(selectChatId);
  const levelConversation = useSelector(selectLevel);
  const topicConversation = useSelector(selectTopic);
  const messages = useSelector(selectMessages);
  const loading = useSelector(selectLoading);

  const getInitialMessage = useCallback(async () => {
    const promptIntroduction = new PromptTemplate({
      template: AI_INTRODUCTION_PROMPT,
      inputVariables: ["topic", "intro"],
    });

    const AI_INTRODUCTION = await promptIntroduction.format({
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

  // const saveChatConfig = async () => {
  //   const chatConfig = {
  //     level: levelConversation,
  //     topic: topicConversation,
  //   };

  //   const data = await saveChatbotConfig(chatConfig); // you can replace doc() with any unique identifier like user's id
  //   return data;
  // };

  return {
    chatId,
    messages,
    loading,
    levelConversation,
    topicConversation,
    getInitialMessage,
    addMessage,
    addFeedBack,
    setLoadingStatus,
    setLevelConversation,
    setTopicConversation,
  };
};
