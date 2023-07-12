import { useChat } from "../../store/chatbot/useChat";
import LoadingMessage from "./LoadingMessage";
import Message from "./Message";
import { StyledMessagesContainer } from "./styled";

interface MessageContainerProps {
  onSubmit: (message: string, edit?: boolean) => void;
}

const MessagesContainer: React.FC<MessageContainerProps> = ({ onSubmit }) => {
  const { messages, loading, removeLastAIResponse, editLastUserMessage } =
    useChat();
  const handleResubmit = (newMessage: string) => {
    editLastUserMessage(newMessage);
    removeLastAIResponse();
    onSubmit(newMessage, true);
  };
  return (
    <StyledMessagesContainer maxWidth="lg">
      {messages.map((message, index) => (
        <Message
          key={index}
          {...message}
          isLastMessageSent={index === messages.length - 2}
          handleResubmit={handleResubmit}
        />
      ))}
      {loading && <LoadingMessage />}
    </StyledMessagesContainer>
  );
};

export default MessagesContainer;
