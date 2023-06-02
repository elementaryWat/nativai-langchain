import { useChat } from "../../store/chatbot/useChat";
import LoadingMessage from "./LoadingMessage";
import Message from "./Message";
import { StyledMessagesContainer } from "./styled";

const MessagesContainer = () => {
  const { messages, loading } = useChat();
  return (
    <StyledMessagesContainer>
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
      {loading && <LoadingMessage />}
    </StyledMessagesContainer>
  );
};

export default MessagesContainer;
