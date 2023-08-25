import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { FeedBack, Message as MessageType } from "../../types/Message";
import {
  selectTopic,
  selectLoading,
  selectMessages,
  selectChatId,
  selectUsername,
  selectIsAudioPlaying,
} from "./selectors";
import {
  addMessageAction,
  setLoading,
  addFeedBackToLastMessage,
  setLastUserMessageIndex,
  setTopic,
  setMessagesAction,
  setErrorFeedBackToLastMessage,
  setAudioPlayingAction,
  removeLastAIResponseAction,
  editLastUserMessageAction,
  setChatIdAction,
} from "./chatbotSlice";
import { promptIntroduction } from "../../pages/api/utils/promptTemplates";
import { INTRODUCTIONS, TOPICS } from "../../constants";

export const useChat = () => {
  const dispatch = useDispatch();
  const chatId = useSelector(selectChatId);
  const topicConversation = useSelector(selectTopic);
  const messages = useSelector(selectMessages);
  const isAudioPlaying = useSelector(selectIsAudioPlaying);
  const loading = useSelector(selectLoading);

  function getRandomIntroductionForTopic(topic: string) {
    const introductions = INTRODUCTIONS[topic];
    if (!introductions || introductions.length === 0) return "";

    const randomIndex = Math.floor(Math.random() * introductions.length);
    return introductions[randomIndex];
  }

  const getInitialMessage = useCallback(
    async (username: string) => {
      setMessages([]);

      const randomIntroduction =
        getRandomIntroductionForTopic(topicConversation);

      const AI_INTRODUCTION = await promptIntroduction.format({
        username,
        topic: TOPICS[topicConversation],
        intro: randomIntroduction,
      });

      dispatch(
        addMessageAction({
          role: "assistant",
          content: AI_INTRODUCTION,
          feedback: null,
          loadingFeedback: false,
        })
      );
    },
    [dispatch, topicConversation]
  );

  const setChatId = useCallback(
    (chatId: string) => {
      dispatch(setChatIdAction(chatId));
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

  const editLastUserMessage = useCallback(
    (message: string) => {
      dispatch(editLastUserMessageAction(message));
    },
    [dispatch]
  );

  const removeLastAIResponse = useCallback(() => {
    dispatch(removeLastAIResponseAction());
  }, [dispatch]);

  const setAudioPlaying = useCallback(
    (playing: boolean) => {
      dispatch(setAudioPlayingAction(playing));
    },
    [dispatch]
  );

  const addFeedBack = useCallback(
    (feedback: FeedBack) => {
      dispatch(addFeedBackToLastMessage({ feedback }));
    },
    [dispatch, messages]
  );

  const setErrorFeedback = useCallback(() => {
    dispatch(setErrorFeedBackToLastMessage());
  }, [dispatch]);

  const setLoadingStatus = useCallback(
    (status: boolean) => {
      dispatch(setLoading(status));
    },
    [dispatch]
  );

  return {
    chatId,
    messages,
    isAudioPlaying,
    loading,
    topicConversation,
    setChatId,
    getInitialMessage,
    addMessage,
    editLastUserMessage,
    removeLastAIResponse,
    setAudioPlaying,
    addFeedBack,
    setErrorFeedback,
    setLoadingStatus,
    setTopicConversation,
  };
};
