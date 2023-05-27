import { Box } from "@mui/material";
import styled from "@emotion/styled";

interface MessageProps {
  content: string;
  role: "user" | "system" | "assistant";
}

const MessageBubble = styled(Box)(
  ({ role }: { role: "user" | "system" | "assistant" }) => ({
    background: role === "user" ? "#4caf50" : "#f1f1f1",
    padding: "10px 20px",
    borderRadius: "20px",
    color: role === "user" ? "white" : "black",
    marginBottom: "10px",
    width: "80%",
  })
);

const MessageContainer = styled(Box)(
  ({ role }: { role: "user" | "system" | "assistant" }) => ({
    display: "flex",
    justifyContent: role === "user" ? "flex-end" : "flex-start",
    width: "100%",
  })
);

const Message = ({ content, role }: MessageProps) => {
  return (
    <MessageContainer role={role}>
      <MessageBubble role={role}>{content}</MessageBubble>
    </MessageContainer>
  );
};

export default Message;
