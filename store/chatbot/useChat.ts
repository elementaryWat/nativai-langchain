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
  selectIsAudioPlaying,
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
  setErrorFeedBackToLastMessage,
  setAudioPlayingAction,
  removeLastAIResponseAction,
  editLastUserMessageAction,
  setChatIdAction,
} from "./chatbotSlice";
import { INTRODUCTIONS, TOPICS } from "../../constants";
import { promptIntroduction } from "../../pages/api/utils/promptTemplates";

export const useChat = () => {
  const dispatch = useDispatch();
  const chatId = useSelector(selectChatId);
  const username = useSelector(selectUsername);
  const levelConversation = useSelector(selectLevel);
  const topicConversation = useSelector(selectTopic);
  const messages = useSelector(selectMessages);
  const isAudioPlaying = useSelector(selectIsAudioPlaying);
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
  }, [dispatch, username, topicConversation]);

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

  const setChatId = useCallback(
    (chatId: string) => {
      dispatch(setChatIdAction(chatId));
    },
    [dispatch]
  );

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
    username,
    messages,
    isAudioPlaying,
    loading,
    levelConversation,
    topicConversation,
    setChatId,
    getInitialMessage,
    setUsername,
    addMessage,
    editLastUserMessage,
    removeLastAIResponse,
    setAudioPlaying,
    addFeedBack,
    setErrorFeedback,
    setLoadingStatus,
    setLevelConversation,
    setTopicConversation,
  };
};
