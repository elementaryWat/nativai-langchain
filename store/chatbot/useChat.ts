import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { FeedBack, Message as MessageType } from "../../types/Message";
import { selectLevel, selectLoading, selectMessages } from "./selectors";
import {
  addMessageAction,
  setLevel,
  setLoading,
  addFeedBackToLastMessage,
  setLastUserMessageIndex,
} from "./chatbotSlice";

export const useChat = () => {
  const dispatch = useDispatch();
  const levelConversation = useSelector(selectLevel);
  const messages = useSelector(selectMessages);
  const loading = useSelector(selectLoading);

  const setLevelConversation = useCallback(
    (level: string) => {
      dispatch(setLevel(level));
    },
    [dispatch]
  );

  const addMessage = useCallback(
    (message: MessageType) => {
      if (message.role === "user") {
        dispatch(setLastUserMessageIndex(messages.length));
      }
      dispatch(addMessageAction(message));
    },
    [dispatch]
  );

  const addFeedBack = useCallback(
    (feedback: FeedBack) => {
      console.log(feedback);
      dispatch(addFeedBackToLastMessage({ feedback }));
    },
    [dispatch]
  );

  const setLoadingStatus = useCallback(
    (status: boolean) => {
      dispatch(setLoading(status));
    },
    [dispatch]
  );

  return {
    messages,
    loading,
    levelConversation,
    addMessage,
    addFeedBack,
    setLoadingStatus,
    setLevelConversation,
  };
};
