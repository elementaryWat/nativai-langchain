import { Message as MessageType } from "../../types/Message";
import { StyledMessagesContainer } from "../styles";
import LoadingMessage from "./LoadingMessage";
import Message from "./Message";

interface MessageContainerProps {
  messages: MessageType[];
  loading: boolean;
}

const MessagesContainer = ({ messages, loading }: MessageContainerProps) => {
  return (
    <StyledMessagesContainer>
      {messages.map((message, index) => (
        <Message
          key={index}
          content={message.content}
          role={message.role}
          feedback={message.feedback}
        />
      ))}
      {loading && <LoadingMessage />}
    </StyledMessagesContainer>
  );
};

export default MessagesContainer;
